<script>
    import {logout} from '../../../scripts/auth';


    let admin = localStorage.getItem('admin');
</script>

<div>
    <div class="navbar">
        <div class="logo">
            <a href="http://">
                PicturePulse
            </a>
        </div>
        <div class="buttons">
            {#if admin}
                <button>Film list</button>
            {/if}
            <button on:click={logout}>Log out</button>
            <button>My Profile</button>
        </div>
    </div>
</div>


<style>
     /*Styles for the navbar*/
     .navbar {
        background-color: #2C3E50;
        overflow: hidden;
        position: fixed;
        top: 0;
        height: 8vh;
        width: 100%;
        display: flex;
        justify-content: space-between;
        z-index: 9;

    }

    .logo{
        height: 100%;
        width: auto;
        padding-left: 30vh;
        display: flex;
        align-items: center;
    }

    .logo > a {
        color: white;
        width: auto;
        text-decoration: none;
     
    }


    .buttons{
        padding-right: 30vh;
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
   