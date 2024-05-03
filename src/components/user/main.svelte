<script>
    import {onMount} from 'svelte';

    let films = [];
    async function getFilms(){
        try {
            const response = await fetch("http://localhost:5000/film/startFilms", {
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
        films = await getFilms();
    })
</script>

<main>
    <form on:submit|preventDefault={getFilms}>
        <button type="submit">getFilmes</button>
    </form>
    {#await films}
        <h1>buenas</h1>
    {:then list}
        {console.log(list)}
        {#each films as film}
            <div>{film.title}</div>
        {/each} 
    {:catch error}
        <div>
            {error}
        </div>
    {/await}
</main>

<style>
    main{
        padding-top: 8vh;
    }
</style>