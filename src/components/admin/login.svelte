<script>
  import { giveAdmin } from "../../../scripts/auth";

  let logError;
  let username = '';
  let password = '';
  async function login(){
    try {
      console.log(username, password);
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
    width: 30%;
    background-color: #3498DB;
  }
</style>
 
<main>
  <form on:submit|preventDefault={login}>
    <label for="userName">User name or email:</label>
    <input type="text" name="userName" bind:value={username} required>
    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={password} required>
    <label for="error" class="errorMsg invisible" bind:this={logError}>Invalid credentials</label>
    <button type="submit">Login</button>
  </form>
</main>