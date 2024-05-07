<script>
    import {onMount, tick} from 'svelte';
    export let filmId;

    let film;
    async function getFilm(){
        try {
            const response = await fetch(`http://localhost:5000/film/getFilm/${filmId}`, {
                headers: {"Content-Type": "application/json"},
                method: 'GET'
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return res;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    onMount(async function(){
        film = await getFilm();
        console.log(film);
        
    })

</script>

<style>

</style>

<main>
    {#await film}
    <h1>Cargando</h1>
    {:then filmData}
    <div class="film">
        <h1>{filmData.title}</h1>
    </div>
    {:catch error}
    <h1>{error}</h1>
    {/await}

</main>