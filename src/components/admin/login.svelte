<script>
  let logError;
  let username = '';
  let password = '';
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
</script>

<style>
  /* You can add styles for your form here */
</style>
 
<main>
  <form on:submit|preventDefault={login(loginForm)}>
    <label for="userName">User name or email:</label>
    <input type="text" name="userName" bind:value={username} required>
    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={password} required>
    <label for="error" class="errorMsg invisible" bind:this={logError}>Invalid credentials</label>
    <button type="submit">Login</button>
  </form>
</main>