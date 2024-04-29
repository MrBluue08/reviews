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
        <button type="submit">Register</button>
    </form>
</main>

<style>
    main{
        margin-top: 5vh;
    }
</style>