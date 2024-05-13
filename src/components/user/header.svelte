<script>
    import {giveAuth} from '../../../scripts/auth';
    import { navigate } from 'svelte-navigator';



    //register variables
    let email,userName,password;
    let registerError;
    let registerForm;

    //login variables
    let loginForm;
    let logError;
    let idLog, passwordLog;

    async function register(form) {
        try {
            const response = await fetch("http://localhost:5000/user/registerUser", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, userName, password })
            });

            const user = await response.json();
            if (!response.ok) {
                throw new Error('Failed to register user');
            }else{
                giveAuth(user);
            }
            hideForm(form);
        } catch (error) {
            registerError.classList.remove('invisible');
            console.error('Error:', error.message);
        }
    }

    async function login(form){
        try {
            const response = await fetch("http://localhost:5000/user/login", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idLog, password })
            });

            const user = await response.json();
            giveAuth(user);
            hideForm(form);
            location.reload();
        } catch (error) {
            logError.classList.remove('invisible');
        }
    }

    function showForm(form){
        form.style.visibility = "visible";
    }

    function hideForm(form){
        form.style.visibility = "hidden";
        email = "";
        userName = "";
        password = "";
        idLog = "";
        passwordLog = "";
    }
</script>


<div>
    <div class="header">
        <div class="navbar">
            <div class="logo">
                <button on:click={() => (navigate(`/`))} class="logo">
                    <img src="/logo/logo.png" alt="">
                    <div>PicturePulse</div>
                </button>
            </div>
            <div class="buttons">
                <button on:click={() => { showForm(registerForm); hideForm(loginForm); }}>Sign Up</button>
                <button on:click={() => { showForm(loginForm), hideForm(registerForm); }}>Sign In</button>
            </div>
        </div>
    </div>
    
    <div class="popUp" bind:this={registerForm}>
        <form on:submit|preventDefault={register(registerForm)}>
            <label for="mail">Email:</label>
            <input type="email" name="mail" bind:value={email} required>
            <label for="userName">User name:</label>
            <input type="text" name="userName" bind:value={userName} required>
            <label for="password">Password:</label>
            <input type="password" name="password" bind:value={password} required>
            <label for="error" class="errorMsg invisible" bind:this={registerError}>Credentials already in use</label>
            <div class="submit">
                <button type="submit">Register</button>
                <button on:click|preventDefault={hideForm(registerForm)}>Cancel</button>
            </div>
        </form>
    </div>


    <div class="popUp" bind:this={loginForm}>
        <form on:submit|preventDefault={login(loginForm)}>
            <label for="userName">User name or email:</label>
            <input type="text" name="userName" class="input" bind:value={idLog} required>
            <label for="password">Password:</label>
            <input type="password" name="password" class="input" bind:value={password} required>
            <label for="error" class="errorMsg invisible" bind:this={logError}>Invalid credentials</label>
            <div class="submit">
                <button type="submit">Login</button>
                <button on:click|preventDefault={hideForm(loginForm)}>Cancel</button>
            </div>
        </form>
    </div>
</div>

<style>

    /*General*/
    .invisible{
        display: none;
    }

    /*Login and register forms*/
    .popUp{
        margin: 0;
        margin-top: 8%;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        z-index: 9;
        width: 30%;
        visibility: hidden;
        background-color: #3498DB;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        color: white;
        box-shadow: 
        rgba(9, 76, 92, 0.4) 5px 5px, 
        rgba(9, 76, 92, 0.3) 10px 10px,
        rgba(9, 76, 92, 0.2) 15px 15px, 
        rgba(9, 76, 92, 0.1) 20px 20px, 
        rgba(9, 76, 92, 0.05) 25px 25px;

    }
    form{
        margin: 10px;
        display: flex;
        flex-direction: column;
        width: 80%;
    }

    .errorMsg{
        color: red;
    }

    form > div{
        display: flex;
        justify-content: end;
    }

    .submit > button {
        margin: 5px; /* Adjust the margin as needed */
        align-self: center;
        background-color: #fff;
        background-image: none;
        background-position: 0 90%;
        background-repeat: repeat no-repeat;
        background-size: 4px 3px;
        border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
        border-style: solid;
        border-width: 2px;
        box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
        box-sizing: border-box;
        color: #41403e;
        cursor: pointer;
        display: inline-block;
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

    .submit > button:hover {
        box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
        transform: translate3d(0, 2px, 0);
    }

    .submit > button:focus {
        box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
    }

    label{
        padding-bottom: 1vh;
    }

    .input {
        border-radius: 10px;
        outline: 2px solid white;
        border: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #e2e2e2;
        outline-offset: 3px;
        padding: 10px 1rem;
        transition: 0.25s;
    }

    .input:focus {
        outline-offset: 5px;
        background-color: #fff
    }



    
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
