<script>
    import {giveAuth, onLogin, logout} from '../../../scripts/auth';



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
            hideForm(form);
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
    <div class="navbar">
        <div class="logo">
            <a href="http://">
                PicturePulse
            </a>
        </div>
        <div class="buttons">
            <button>My Profile</button>
            <button on:click={() => { showForm(registerForm); hideForm(loginForm); }}>Sign Up</button>
            <button on:click={() => { showForm(loginForm), hideForm(registerForm); }}>Sign In</button>
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
            <div>
                <button type="submit">Register</button>
                <button on:click|preventDefault={hideForm(registerForm)}>Cancel</button>
            </div>
        </form>
    </div>


    <div class="popUp" bind:this={loginForm}>
        <form on:submit|preventDefault={login(loginForm)}>
            <label for="userName">User name or email:</label>
            <input type="text" name="userName" bind:value={idLog} required>
            <label for="password">Password:</label>
            <input type="password" name="password" bind:value={password} required>
            <label for="error" class="errorMsg invisible" bind:this={logError}>Invalid credentials</label>
            <div>
                <button type="submit">Login</button>
                <button on:click|preventDefault={hideForm(loginForm)}>Cancel</button>
            </div>
        </form>
    </div>
</div>

<style>

    /*Genral*/
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
        background-color: #094c5c;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        color: white;
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

    
    /*Styles for the navbar*/
    .navbar {
        background-color: #094c5c;
        overflow: hidden;
        position: fixed;
        top: 0;
        height: 8vh;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .logo{
        height: 100%;
        width: auto;
        padding-left: 15vh;
        display: flex;
        align-items: center;
    }

    .logo > a {
        color: white;
        width: auto;
        text-decoration: none;
     
    }


    .buttons{
        padding-right: 15vh;
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