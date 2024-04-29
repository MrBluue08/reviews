<script>
    import {onRegister, onLogin, logout} from '../../scripts/auth';




    let email,userName,password;
    let registerForm;
    async function handleSubmit() {
        try {
            const response = await fetch("http://localhost:5000/user/registerUser", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, userName, password })
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }else{
                onRegister(response);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function register(){
        handleSubmit();
        registerForm.style.visibility = "hidden";
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
    <!-- Logo -->
        <!-- <a href="#" class="logo">Your Logo</a> -->
    
        <!-- Navigation links -->
        <button>My Profile</button>
        <button on:click={showForm(registerForm)}>Sign Up</button>
        <button>Sign In</button>
    </div>
    
    <div class="popUp" bind:this={registerForm}>
        <form on:submit|preventDefault={register} class="form">
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
</div>

<style>
    .popUp{
        margin: 0;
        margin-top: 5vh;
        margin-left: 40%;
        margin-right: 40%;
        position: absolute;
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
        background-color: #333;
        overflow: hidden;
        overflow-y: auto;
        position: fixed;
        top: 0;
        height: 5vh;
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
    .navbar .logo {
        float: left;
        padding: 10px 20px;
        font-size: 20px;
        color: white;
        text-decoration: none;
    }
    
    /* Links styling */
    .navbar button {
        float: right;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 20px;
        text-decoration: none;
    }
    
    /* On hover color change */
    .navbar button:hover {
        background-color: #ddd;
        color: black;
    }
</style>