<script>
    import {onMount} from 'svelte';
    let films = []; 
    async function getFilms(){
        films = [];
        try {
            const response = await fetch("http://localhost:5000/film/startFilms", {
                headers: {"Content-Type": "application/json"},
                method: 'GET'
            });
            const res = await response.json();
            res.forEach(element => {
                films.push(element)
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            
        }
    }

    onMount(async function(){
        getFilms();    
    })
    
</script>

<main>
    <form on:submit|preventDefault={getFilms}>
        <button type="submit">getFilmes</button>
    </form>
</main>

<style>
    main{
        padding-top: 8vh;
    }
</style>