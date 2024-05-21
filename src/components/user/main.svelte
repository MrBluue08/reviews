<script>
    import {onMount} from 'svelte';
    import { navigate } from 'svelte-navigator';
    import {SearchIcon} from "svelte-feather-icons";
    import {filmSearcher} from '../../../scripts/searcherFilms';
    import {Star} from 'flowbite-svelte';


    //Session variables
    let user  = localStorage.getItem('user');

    let films = [];
    async function getFilms(){
        try {
            const response = await fetch("http://localhost:5000/film/startFilms", {
                headers: {"Content-Type": "application/json"},
                method: 'GET'
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Server error');
            }
            return res;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    let movieRatings = [];
    async function getRatings(){
        try {
            const response = await fetch(`http://localhost:5000/review/getRatings`, {
                headers: {"Content-Type": "application/json"},
                method: 'GET'
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Server error');
            }
            return res;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }


    const getImageUrl = (path) => {
        return `http://localhost:5000${path}`;
    };
   
    onMount(async function(){
        films = await getFilms();
        movieRatings = await getRatings();
        films = films.map(film => {
            if(film.title in movieRatings){
                film.rating = (movieRatings[film.title] / 5)  *100;
            }else{
                film.rating = 0;
            }
            return film;
        });
        
        console.log(films);
    })

    async function searchFilms(search){
        films = await filmSearcher(search);
    }
</script>

<main>
    <div class="container">
        <div class="search-box">
            <button class="btn-search">
                <SearchIcon />
            </button>
            <input type="text" class="input-search" placeholder="Search for films..." on:input={(e) => searchFilms(e.target.value)}>
        </div>
        <div class="films">
            {#await films}
            <h1>Cargando</h1>
            {:then}
                {#each films as film}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="card" on:click={() => (navigate(`/filmProfile/${film._id}`))}>
                        <img src="{getImageUrl('/uploads/'+film.poster)}" alt="Poster of {film.title}" class="cardInfo img">
                        <div class="cardInfo txt">
                            <Star size={100} fillPercent={ film.rating } />
                            <h4>{film.rating}%</h4>                  
                        </div>
                    </div>
                {/each} 
            {:catch error}
                <div>
                    {error}
                </div>
            {/await}
        </div>
    </div>
</main>

<style>
    main{
        display: flex;
        justify-content: center;
    }
    .container{
        width: 60%;
        padding-top: 2vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
/*Film list style*/
    .films{
        display: flex;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }


/*Indivdual film style*/
    .card {
        width: 8vw;
        display: grid;
        grid-template-columns: 1;
        grid-template-rows: 1;
        padding: 0 0.5vh 1vh 0.5vh;
        
    }

    .card > img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .cardInfo {
        grid-row-start: 1;
        grid-column-start: 1;
        width: 100%;
    }

    .cardInfo.txt {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        color: #00ff59;
        z-index: 2;
    }

    .cardInfo.img{
        z-index: 1;
    }

    .cardInfo.txt > h4{
        padding: 0;
        margin: 0;
    }

    .card:hover .cardInfo.img {
        filter: blur(1px);
        transition: filter 0.3s ease; 
    }
    
    .card:hover .cardInfo.txt {
        border-radius: 5px;
        border: 2px solid #00ff59;
        transition: opacity 0.3s ease; 
        opacity: 1;
    }


   /* Stolen searchbar style */
   .search-box{
        align-self: flex-end;
        margin-right: 1vh;
        width: 100%;
        width: fit-content;
        height: fit-content;
        position: relative;
    }
    .input-search{
        height: 50px;
        width: 50px;
        border-style: none;
        padding: 10px;
        font-size: 18px;
        letter-spacing: 2px;
        outline: none;
        border-radius: 25px;
        transition: all .5s ease-in-out;
        background-color: #22a6b3;
        padding-right: 40px;
        color:white;
    }
    .input-search::placeholder{
        color:rgba(255,255,255,.5);
        font-size: 18px;
        letter-spacing: 2px;
        font-weight: 100;
    }
    .btn-search:hover{
        border: solid 2px white;
    }
    .btn-search{
        width: 50px;
        height: 50px;
        border-style: none;
        font-size: 20px;
        font-weight: bold;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        position: absolute;
        right: 0px;
        color:#ffffff ;
        background-color:transparent;
        pointer-events: painted;  
    }
    .btn-search:focus ~ .input-search{
        width: 300px;
        border-radius: 0px;
        background-color: transparent;
        border-bottom:1px solid rgba(255,255,255,.5);
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    }
    .input-search:focus{
        width: 300px;
        border-radius: 0px;
        background-color: transparent;
        border-bottom:1px solid rgba(255,255,255,.5);
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    }
</style>