<script>
    import {checkAdmin, checkLogged} from '../../../scripts/auth';
    import {onMount} from 'svelte';
    export let filmId;
    let admin = checkAdmin();
    let logged = checkLogged();
     
    let film = {};
    async function getFilm(){
        try {
            const response = await fetch(`http://localhost:5000/film/getFilm/${filmId}`, {
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

    onMount(async function(){
        film = await getFilm();
        film.releaseDate = new Date(film.releaseDate);
        film.releaseDate = film.releaseDate.getFullYear();
        
    })

    const getImageUrl = (path) => {
        return `http://localhost:5000${path}`;
    };

</script>


<main>
    {#await film}
    <h1>Cargando</h1>
    {:then}
    <div class="film">
        <img src="{getImageUrl('/uploads/'+film.poster)}" alt="Poster of {film.title}" class="cardInfo img">
        <div>
            <h1 class="title">{film.title}</h1>
            <h3 class="addInfo">{film.releaseDate} Directed by {film.director}</h3>
            <p class="sinopsis">{film.sinopsis}</p>

            {#if !admin && logged}
                <form class="review">
                    <h2>Share your opinion!</h2>
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="text">1 star</label>
                    </div>
                    <textarea class="reviewTxt"></textarea>
                    <button type="submit" class="publish">Publish</button>                
                </form>
            {/if}
        </div>
    </div>
    {:catch error}
        <h1>{error}</h1>
    {/await}

</main>

<style>
    main{
        padding-top: 15vh;
        width: 100%;
        display: flex;
        justify-content: center;
        color: white;
    }
    .film  {
        width: 60%;
        display: grid;
        grid-template-columns: 30% 70%;
        grid-gap: 2%;
    }

    .film img{
        width: 100%;
        border-radius: 5px;
    }

    .review{
        grid-column-start: 1;
        grid-column-start: 2;
    }
    .reviewTxt{
        width: 100%;
        height: 30vh;
        background-color: #5d94a2;
        color: white;
    }

    /*Stolen button style*/
    .publish{
        float: right;
        margin: 5px; /* Adjust the margin as needed */
        background-color: #fff;
        background-position: 0 90%;
        background-size: 4px 3px;
        border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
        border-style: solid;
        border-width: 2px;
        box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
        box-sizing: border-box;
        color: #41403e;
        cursor: pointer;
        font-family: Neucha, sans-serif;
        font-size: 1rem;
        line-height: 23px;
        outline: none;
        padding: .75rem;
        text-decoration: none;
        transition: all 235ms ease-in-out;
        border-bottom-left-radius: 15px 255px;
        border-bottom-right-radius: 225px 15px;
        border-top-left-radius: 255px 15px;
        border-top-right-radius: 15px 225px;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    /*Stolen 5 star style*/
    .rate {
        float: right;
        height: 46px;
        padding: 0 10px;
    }
    .rate:not(:checked) > input {
        position:absolute;
        top:-9999px;
    }
    .rate:not(:checked) > label {
        float:right;
        width:1em;
        overflow:hidden;
        white-space:nowrap;
        cursor:pointer;
        font-size:30px;
        color:#ccc;
    }
    .rate:not(:checked) > label:before {
        content: '★ ';
    }
    .rate > input:checked ~ label {
        color: #00ff59;    
    }
    .rate:not(:checked) > label:hover,
    .rate:not(:checked) > label:hover ~ label {
        color: #00ff59;  
    }
    .rate > input:checked + label:hover,
    .rate > input:checked + label:hover ~ label,
    .rate > input:checked ~ label:hover,
    .rate > input:checked ~ label:hover ~ label,
    .rate > label:hover ~ input:checked ~ label {
        color: #00ff59;
    }

</style>