<script>
    import { Router, Route } from "svelte-navigator";
    import ProfileUser from "./components/user/profileUser.svelte";
    import Main from "./components/user/main.svelte";
    import Header from "./components/user/header.svelte";
</script>

<div>
    <Header></Header>
    <Router>
        <Route path="/main">
            <Main/>
        </Route>
    </Router>
</div>

<style>
</style>