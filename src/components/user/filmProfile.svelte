<script>
    import {onMount, tick} from 'svelte';
    export let filmId;

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
        <h1>{film.title}</h1>
        <h3>{film.releaseDate} Directed by {film.director}</h3>
        <p>{film.sinopsis}</p>
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
    }
    .film  {
        width: 60%;
        display: flex;
        color: white;
    }

    .film img{
        width: 20vw;
        border-radius: 5px;
    }
</style>