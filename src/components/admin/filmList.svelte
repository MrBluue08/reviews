<script>
    import { onMount } from "svelte";
    import {SearchIcon, EditIcon, PlusIcon} from "svelte-feather-icons";
    import { navigate } from "svelte-navigator";
    import {filmSearcher} from '../../../scripts/searcherFilms';
    let title;
    let films = [];
    
    onMount(async function(){
        films = await filmSearcher("");
    })


    async function searchFilms(search){
        if(search !== ""){
            title.innerHTML = "Results for '" + search + "'";
        }else{
            title.innerHTML = "Films";
        }
        films = await filmSearcher(search);
    }

</script>


<main>
    <div class="list">
        <div class="buttons">
            <div class="search-box">
                <button class="btn-search">
                    <SearchIcon />
                </button>
                <input type="text" class="input-search" placeholder="Search for films..." on:input={(e) => searchFilms(e.target.value)}>
            </div>
            <div>
                <button class="btn-add" on:click={() => navigate('/filmForm/empty')}>
                    <PlusIcon/>
                </button>
            </div>
        </div>
        <h1 bind:this={title}>Films</h1>
        <ul class="films">
            {#await films}
                <h1>Searching for films</h1>
            {:then} 
                {#each films as film}
                    <li class="film">
                        <p>{film.title}</p>
                        <button on:click={() => navigate(`/filmForm/${film._id}`)}>
                            <EditIcon/>
                        </button>
                    </li>
                {/each}
            {:catch error}
                <h1>{error}</h1>
            {/await}
        </ul>
    </div>
</main>

<style>
    main{
        padding-top: 10vh;
        display: flex;
        justify-content: center;
        color: white;
    }
    .list{
        width: 60%;
    }
    .films{
        padding: 1vh 0 0 0;
        list-style: none;
        border-top: white 1px solid;
    }

    .film{
        height: 3vh;
        padding-left: 1vw;
        margin-bottom: 1vh;
        background-color: #22a6b3;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .film > button{
        padding: 0;
        margin: 0;
        color: white;
    }
    button{     
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;

    }

    .buttons{
        width: 100%;
        display: flex;
        justify-content: right;
    }

    .btn-add{
        background-color: #22a6b3;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        color: white;
    }

    .btn-add:hover{
        border: solid 2px white;
    }

    /* Stolen searchbar style */
    .search-box{
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