<script>
    let username = '';
    let password = '';
  
    function handleSubmit() {
      // Here you can add your logic for handling form submission, like sending a request to the server
      console.log('Username:', username);
      console.log('Password:', password);
      // For example, you can use fetch() to send the data to your server
    }
  </script>
  
  <style>
    /* You can add styles for your form here */
  </style>
  
  <form on:submit|preventDefault={handleSubmit}>
    <label for="username">Username:</label><br>
    <input type="text" id="username" bind:value={username}>
    <label for="password">Password:</label><br>
    <input type="password" id="password" bind:value={password}>
    <button type="submit">Login</button>
  </form>
  