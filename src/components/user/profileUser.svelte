<script>
    import { onMount } from "svelte";
    import { getUser, checkLogged } from "../../../scripts/auth";
    import { Rating, Star } from 'flowbite-svelte';
    export let userId;
    let logged = checkLogged();
    let user = {};
    let userReviews = [];
    let posters = [];
    let avg = 0;


    function checkMyself(){
        if(logged){
            let me = getUser();
            return me.username === userId;
        }else{
            return false;
        }
    }

    async function getProfileUser(){
        try {
            const response = await fetch(`http://localhost:5000/user/getUser/${userId}`, {
                headers: {"Content-Type": "application/json"},
                method: 'GET' 
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Server error');
            }
            console.log(res);
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    async function getReviews(user){
        try {
            const response = await fetch(`http://localhost:5000/review/getReviews/user/${user.username}`, {
                headers: {"Content-Type": "application/json"},
                method: 'GET' 
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Server error');
            }
            console.log(res);
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    async function getPosters(){
        try {
            const response = await fetch(`http://localhost:5000/film/getPosters`, {
                headers: {"Content-Type": "application/json"},
                method: 'GET' 
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Server error');
            }
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    async function averageRating(reviews) {
        let total = 0;
        for (let review of reviews) {
            total += review.rating;
        }
        let average = total / reviews.length;
        average = Math.round(average *10)/10;
        return average;
    }

    onMount(async()=>{
        if(!checkMyself()){
            user = await getProfileUser();
            user.owner = false;
        }else{
            user = await getUser();   
            user.owner = true;
        }
        userReviews = await getReviews(user);
        avg = await averageRating(userReviews);
        posters = await getPosters();
    })
</script>

<main>
    <div class="user">
        {#await user}
            <h1>Cargando usuario</h1>
        {:then}
            <h1 class="title">{user.username}</h1>
        {/await}
        
        {#await userReviews}
            <h1>Loading reviews</h1>
        {:then}

            <div class="stats">
                {#if user.owner}
                <h2>Your stats</h2>
                {:else}
                <h2>{user.username}'s stats</h2>
                {/if}
                <div class="statsInfo">
                    <h4>{userReviews.length} posted reviews</h4>
                    <h4 class="average">
                        <p>Average rating </p>
                        <Star size={50} fillPercent={ avg/5 * 100 } />
                        <p>{avg}</p>
                    </h4>
                </div>
            </div>

            <div class="reviews">
                {#if user.owner}
                <h2>Your reviews</h2>
                {:else}
                <h2>{user.username}'s reviews</h2>
                {/if}
                {#each userReviews as review}
                <div class="review">
                    <img src={`http://localhost:5000/uploads/${posters[review.film]}`} alt="" class="poster">
                    <div class="reviewInfo">
                        <p>{review.text}</p>
                        <Rating total={5} rating={review.rating}/>
                        <h3>{review.film}</h3>
                    </div>
                </div>
                {/each}
            </div>
        {/await}
    </div>
</main>

<style>
    main{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .user{
        width: 60%;
        color: white;
    }

    /*Stats style*/

    .statsInfo{
        font-size: larger;
        font-weight: 500;
        height: 5vh;
        display: flex;
        justify-content: space-around;
    }
    
    .statsInfo > h4{
        display: flex;
        align-items: center;
    }

    /*Reviews style*/
    .review{
        display: flex;
        width: 100%;
        padding-bottom: 5vh;
        padding-top: 5px;
        border-top: 2px solid #5d94a2;
    }

    .reviewInfo{
        font-size: larger;
        font-weight: 500;
    }

    .poster{
        width: 10vw;
        padding-right: 1vw;
    }


</style>