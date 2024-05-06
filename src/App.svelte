<script>
    import { Router, Route } from "svelte-navigator";
    import { checkLogged, checkAdmin } from "../scripts/auth";
    import ProfileUser from "./components/user/profileUser.svelte";
    import Main from "./components/user/main.svelte";
    import Header from "./components/user/header.svelte";
    import LoggedHeader from "./components/user/loggedHeader.svelte";
    import NewFilm from "./components/admin/newFilm.svelte";
    import Login from "./components/admin/login.svelte";

    let loggedIn = checkLogged();
    let admin = checkAdmin();
</script>

<div>
    {#if loggedIn}
        <LoggedHeader/>
    {:else}
        <Header/>
    {/if}
    <Router>
        <!-- RUTAS DE ADMIN -->
        <Route path="/adminLogin" component={Login}/>

        <!-- RUTAS DE USER -->
        <Route path="" component={Main}/>
    </Router>

    {#if admin}
        <Route path="/newFilm" component={Main}/>
    {/if}

</div>
