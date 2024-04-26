<script>
    let email,userName,password;

</script>


<div class="navbar">
<!-- Logo -->
    <a href="#" class="logo">Your Logo</a>

    <!-- Navigation links -->
    <a href="#">My Profile</a>
    <a href="#">Sign Up</a>
    <a href="#">Sign In</a>
</div>

<div class="popUp">
    <form>
        <label for="mail">Email:</label>
        <input type="email" name="mail" bind:value={email} required>
        <label for="userName">User name:</label>
        <input type="text" name="userName" bind:value={userName} required>
        <label for="password">Password:</label>
        <input type="password" name="password" bind:value={password} required>
        <button type="submit">Register</button>
    </form>
</div>

<style>
    .popUp{
        margin: 0;
        margin-top: 45px;
        margin-left: 40%;
        margin-right: 40%;
        position: absolute;
        z-index: 9;
    }
    /* Basic styling for the navbar */
    .navbar {
        background-color: #333;
        overflow: hidden;
        overflow-y: auto;
        position: fixed;
        top: 0;
        width: 100%;
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
    .navbar a {
        float: right;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 20px;
        text-decoration: none;
    }
    
    /* On hover color change */
    .navbar a:hover {
        background-color: #ddd;
        color: black;
    }
</style>