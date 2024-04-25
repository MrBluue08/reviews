<script>
    import { Router, Route } from "svelte-navigator";
    import RegisterUser from "./components/user/registerUser.svelte";
    import ProfileUser from "./components/user/profileUser.svelte";
</script>


<Router>
    <Route path="/register">
        <RegisterUser/>
    </Route>
</Router>