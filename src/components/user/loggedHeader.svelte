<script>
    import {checkAdmin, logout} from '../../../scripts/auth';
    import { navigate } from 'svelte-navigator';


    let admin = checkAdmin();
</script>

<div>
    <div class="header">
        <div class="navbar">
            <div class="logo">
                <button on:click={() => (navigate(`/`))}>
                    PicturePulse
                </button>
            </div>
            <div class="buttons">
                {#if admin}
                    <button on:click={() => (navigate(`/filmList`))}>Film list</button>
                {/if}
                <button on:click={logout}>Log out</button>
                <button>My Profile</button>
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
        justify-content: space-between;
        z-index: 9;

    }

    .logo{
        height: 100%;
        width: auto;
        display: flex;
        align-items: center;
    }

    .logo > button {
        color: white;
        width: auto;
        text-decoration: none;
     
    }


    .buttons{
        height: 100%;
    }

    .navbar button {
        float: right;
        height: 100%;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 20px;
        text-decoration: none;
        background-color: transparent;
        border: none;
        border-radius: 0%;
    }
    
    .navbar button:hover {
        color: black;
        background-color: #5d94a2;
    }
</style>
   