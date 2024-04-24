<script>
    let email,userName,password;
    async function handleSubmit(){
        const response = await fetch("")
    }
</script>

<main>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="mail">Email:</label>
        <input type="email" name="mail" bind:value={email} required>
        <label for="userName">User name:</label>
        <input type="text" name="userName" bind:value={userName} required>
        <label for="password">Password:</label>
        <input type="password" name="password" bind:value={password} required>
        <button type="submit">Register</button>
    </form>
</main>

<style>
</style>