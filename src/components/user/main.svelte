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
   
    <div class="films">
        {#await films}
        <h1>Cargando</h1>
        {:then}
            {#each films as film}
                <div class="card">
                    <img src="/images/{film.poster}" alt="Poster of {film.title}" class="cardInfo img">
                    <div class="cardInfo txt">
                        <h4>{film.title}</h4>
                    </div>
                </div>
            {/each} 
        {:catch error}
            <div>
                {error}
            </div>
        {/await}
    </div>
</main>

<style>
    .card {
        display: grid;
        grid-template-columns: 1;
        grid-template-rows: 1;
        width: 25vh;
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
        opacity: 0;
    }

    .card:hover .cardInfo.txt {
        transition: opacity 0.3s ease; 
        opacity: 1;
    }

   
</style>