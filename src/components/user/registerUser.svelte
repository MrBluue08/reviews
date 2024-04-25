<script>
    let email,userName,password;
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
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
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