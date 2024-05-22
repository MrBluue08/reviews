<script>
  import { navigate } from "svelte-navigator";
  import { giveAdmin } from "../../../scripts/auth";

  let logError;
  let username = '';
  let password = '';

  async function login(){
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });
      const user = await response.json();
      giveAdmin(user);
    } catch (error) {
      logError.classList.remove('invisible');
    }
  }
</script>

<style>
  .invisible{
      display: none;
  }
  .errorMsg{
      color: red;
  }

  main{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  form{
    width: 15%;
    border-radius: 10px;
    background-color: #3498DB;
    color: white;
    margin-top: 5vh;
    padding: 5vh;
    box-shadow: 
        rgba(9, 76, 92, 0.4) 5px 5px, 
        rgba(9, 76, 92, 0.3) 10px 10px,
        rgba(9, 76, 92, 0.2) 15px 15px, 
        rgba(9, 76, 92, 0.1) 20px 20px, 
        rgba(9, 76, 92, 0.05) 25px 25px;
    display: flex;
    flex-direction: column;
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

  button{
    width: 33%;
    margin-left: auto;
    margin: 5px; /* Adjust the margin as needed */
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
</style>
 
<main>
  <form on:submit|preventDefault={login}>
    <label for="userName">User name:</label>
    <input type="text" class="input" name="userName" bind:value={username} required>
    <label for="password">Password:</label>
    <input type="password" class="input" name="password" bind:value={password} required>
    <label for="error" class="errorMsg invisible" bind:this={logError}>Invalid credentials</label>
    <button type="submit">Login</button>
  </form>
</main>