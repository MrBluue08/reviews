<script>
    import {checkAdmin, logout} from '../../../scripts/auth';
    import { navigate } from 'svelte-navigator';


    let admin = checkAdmin();
</script>

<div>
    <div class="header">
        <div class="navbar">
            <button on:click={() => (navigate(`/`))} class="logo">
                <img src="/logo/logo.png" alt="">
                <div>PicturePulse</div>
            </button>
            <div class="buttons">
                {#if admin}
                    <button on:click={() => (navigate(`/filmList`))}>Film list</button>
                {/if}
                <button on:click={logout}>Log out</button>
                {#if !admin}
                    <button>My Profile</button>
                {/if}
            </div>
        </div>
    </div>
</div>


<style>
    /*Styles for the navbar*/
    .header{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .navbar {
        background-color: #2C3E50;
        overflow: hidden;
        position: fixed;
        top: 0;
        height: 8vh;
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 9;
    }
    
   
    
    .navbar button {
        color: white;
        padding: 14px 20px;
        background-color: transparent;
        border: none;
        border-radius: 0%;
    }
    
    .logo{
        height: 100%;
        color: white;
        width: auto;
        text-decoration: none;
        font-weight: 800;
        font-size: large;
        margin-left: 0;
        padding-left: 0;
        display: flex;
        align-items: center;
    }

    .logo > img{
        float: left;
        height: 100%;
    }

    .logo > div{
        float: left;
    }
    
    .navbar button:hover {
        color: black;
        background-color: #5d94a2;
    }
</style>
   