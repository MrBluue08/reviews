<script>
    import { Router, Route } from "svelte-navigator";
    import { checkLogged } from "../scripts/auth";
    import ProfileUser from "./components/user/profileUser.svelte";
    import Main from "./components/user/main.svelte";
    import Header from "./components/user/header.svelte";
    import LoggedHeader from "./components/user/loggedHeader.svelte";

    let loggedIn = checkLogged(); 
</script>

<div>
    {#if loggedIn}
        <LoggedHeader/>
    {:else}
        <Header/>
    {/if}
    <Router>
        <Route path="/main" component={Main}/>
    </Router>
</div>
