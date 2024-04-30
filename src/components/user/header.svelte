<script>
    import {giveAuth, onLogin, logout} from '../../../scripts/auth';




    let email,userName,password;
    let registerForm, loginForm;

    async function handleRegister() {
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
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function register(form){
        handleRegister();
        hideForm(form);
    }

    async function login(form){
        handleLogin();
        hideForm(form);
    }

    function showForm(form){
        form.style.visibility = "visible";
    }

    function hideForm(form){
        form.style.visibility = "hidden";
    }
</script>


<div>
    <div class="navbar">
        <a href="">
            <div class="logo">
                <p>PicturePulse</p>
            </div>
        </a>
        <div class="buttons">
            <button>My Profile</button>
            <button on:click={showForm(registerForm)}>Sign Up</button>
            <button on:click={showForm(loginForm)}>Sign In</button>
        </div>
    </div>
    
    <div class="popUp" bind:this={registerForm}>
        <form on:submit|preventDefault={register(registerForm)} class="form">
            <label for="mail">Email:</label>
            <input type="email" name="mail" bind:value={email} required>
            <label for="userName">User name:</label>
            <input type="text" name="userName" bind:value={userName} required>
            <label for="password">Password:</label>
            <input type="password" name="password" bind:value={password} required>
            <div>
                <button type="submit">Register</button>
                <button on:click|preventDefault={hideForm(registerForm)}>Cancel</button>
            </div>
        </form>
    </div>


    <div class="popUp" bind:this={loginForm}>
        <form on:submit|preventDefault={login(loginForm)} class="form">
            <label for="userName">User name:</label>
            <input type="text" name="userName" bind:value={userName} required>
            <label for="password">Password:</label>
            <input type="password" name="password" bind:value={password} required>
            <div>
                <button type="submit">Login</button>
                <button on:click|preventDefault={hideForm(loginForm)}>Cancel</button>
            </div>
        </form>
    </div>
</div>

<style>
    .popUp{
        margin: 0;
        margin-top: 5%;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        z-index: 9;
        width: 30%;
        visibility: hidden;
        background-color: #001f27;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        color: white;
    }
    /* Basic styling for the navbar */
    .navbar {
        background-color: #001f27;
        overflow: hidden;
        overflow-y: auto;
        position: fixed;
        top: 0;
        height: 6vh;
        width: 100%;
    }

    .form{
        margin: 10px;
        display: flex;
        flex-direction: column;
        width: 80%;
    }


    button{
        margin-left: 3px;
    }
    
    .form > div{
        display: flex;
        justify-content: end;
    }
    
    /* Logo styling */
    .logo {
        float: left;
        color: white;
        width: auto;
        height: 100%;
        text-decoration: none;
        padding-left: 15vh;
    }

    .buttons{
        padding-right: 15vh;
    }

    /* Links styling */
    .navbar button {
        float: right;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 20px;
        text-decoration: none;
        background-color: transparent;
        border: none;
    }
    
    /* On hover color change */
    .navbar button:hover {
        color: black;
    }
</style>