<script>
    import {checkAdmin, checkLogged, getUser} from '../../../scripts/auth';
    import {onMount} from 'svelte';
    import {Rating} from 'flowbite-svelte';
    import {TrashIcon} from "svelte-feather-icons";


    export let filmId;
    let user = getUser();
    let admin = checkAdmin();
    let logged = checkLogged();
    
    //review variables
    let rating = 0;
    let reviewTxt;

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

    let reviews = [];
    async function getReviews(){
        try {
            const response = await fetch(`http://localhost:5000/review/getReviews/film/${film.title}`, {
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

    async function postReview(){
        let movie = film.title;
        let userName = user.username;
        try {
            const response = await fetch("http://localhost:5000/review/postReview", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ movie, userName, rating, reviewTxt })
            });

            if (!response.ok) {
                throw new Error('Failed to post review');
            }

            location.reload();
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function likeReview(review){
        try {
            let userId = user.username;
            const response = await fetch("http://localhost:5000/review/like", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userId, review})
            });

            if (!response.ok) {
                throw new Error('Failed to post review');
            }

            reviews = await getReviews();
        } catch (error) {
            console.error(error);
        }
    }

    async function dropReview(review){
        try {
            const response = await fetch("http://localhost:5000/review/dropReview", {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({review})
            });

            if (!response.ok) {
                throw new Error('Failed to post review');
            }

            reviews = await getReviews();
        } catch (error) {
            console.error(error);
        }
    }

    onMount(async function(){
        film = await getFilm();
        film.releaseDate = new Date(film.releaseDate);
        film.releaseDate = film.releaseDate.getFullYear();

        reviews = await getReviews();
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
            <div class="info">
                <h1 class="title">{film.title}</h1>
                <h3 class="addInfo">{film.releaseDate} Directed by {film.director}</h3>
                <p class="sinopsis">{film.sinopsis}</p>
            </div>
            {#if !admin && logged}
            <form on:submit|preventDefault={postReview} class="reviewInput">
                <h2>Share your opinion!</h2>
                <div class="rate">
                    <input type="radio" id="star5" name="rate" value="5" bind:group={rating}/>
                    <label for="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" bind:group={rating}/>
                    <label for="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" bind:group={rating}/>
                    <label for="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" bind:group={rating}/>
                    <label for="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" bind:group={rating}/>
                    <label for="star1" title="text">1 star</label>
                </div>
                <textarea class="reviewTxt" bind:value={reviewTxt}></textarea>
                <button type="submit" class="publish">Publish</button>                
            </form>
            {/if}
        </div>
    </div>
    {:catch error}
        <h1>{error}</h1>
    {/await}

    <div class="reviews">
    {#await reviews}
        <h1>Cargando reviews</h1>
    {:then} 
        {#each reviews as review}
        <div class="review">
            <p>{review.text}</p>
            <Rating total={5} rating={review.rating}/>
            <div>
                <h4>{review.user}</h4>

                {#if logged}
                    {#if admin}
                    <button on:click={dropReview(review._id)} class="delete">
                        <p>Delete review</p>
                        <TrashIcon />
                    </button>
                    {:else}
                    <p>{review.likes.length}</p>
                    <button on:click={likeReview(review._id)} class="like">
                        {#if review.likes.includes(user.username)}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00ff59" stroke="#5d94a2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5d94a2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        {/if}  
                    </button>    
                    {/if}
                {:else}
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5d94a2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                </div>
                {/if}           
            </div>
        </div>
        {/each}
    {/await}
    </div>

</main>

<style>
    main {
        padding-top: 15vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
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

    .info{
        display: grid;
        grid-template-columns: 30% 65%;
        grid-gap: 5%;
    }

    .addInfo, .title{
        align-self: center;
    }

    .sinopsis{
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .reviewInput{
        grid-column-start: 1;
        grid-column-start: 2;
    }

    .reviewInput > h2{
        margin-bottom: 0;
    }

    .reviewTxt{
        width: 100%;
        height: 30vh;
        background-color: #5d94a2;
        color: white;
        resize: none;
    }


    /*Style for review list*/
    .reviews{
        width: 60%;
        padding-top: 4vh;
        padding-bottom: 4vh;
    }

    .review{
        border-bottom: solid 1px #5d94a2;
        font-size: larger;
        font-weight: 200;
    }

    .review > div{
        display: flex;
        justify-content: space-between;
        
    }

    .review > div > h4{
        margin: 0;
    }

    .like{
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }

    
    .delete{
        display: flex;
        background-color: rgb(255, 47, 47);
        border: black 2px solid;
        border-radius: 5px;
        color: black;
        cursor: pointer;
        font-weight: 600;
    }

    .delete:hover{
        background-color: rgb(143, 82, 82);
    }

    .delete > p{
        margin: 0;
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
        color:white;
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