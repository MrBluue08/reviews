<script>
    import { Router, Route } from "svelte-navigator";
    import RegisterUser from "./components/user/registerUser.svelte";
    import ProfileUser from "./components/user/profileUser.svelte";
    import Main from "./components/user/main.svelte";
    import Header from "./components/user/header.svelte";
</script>

<div>
    <Header></Header>
    <Router>
        <Route path="/register">
            <RegisterUser/>
        </Route>
        <Route path="/main">
            <Main/>
        </Route>
    </Router>
</div>