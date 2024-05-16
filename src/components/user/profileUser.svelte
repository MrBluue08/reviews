<script>
    import { onMount } from "svelte";
    import { getUser, checkLogged } from "../../../scripts/auth";
    export let userId;
    let logged = checkLogged();
    let user = {};


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

    onMount(async()=>{
        if(!checkMyself()){
            user = await getProfileUser();
        }else{
            user = await getUser();   
        }
    })
</script>

<main>
    <div class="user">
        {#await user}
            <h1>Cargando usuario</h1>
        {:then}
            <h1 class="title">{user.username}</h1>
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

</style>