<script>
    import { Router, Route } from "svelte-navigator";
    import { checkLogged, checkAdmin } from "../scripts/auth";
    import ProfileUser from "./components/user/profileUser.svelte";
    import Main from "./components/user/main.svelte";
    import Header from "./components/user/header.svelte";
    import LoggedHeader from "./components/user/loggedHeader.svelte";
    import filmForm from "./components/admin/filmForm.svelte";
    import Login from "./components/admin/login.svelte";
    import FilmList from "./components/admin/filmList.svelte";
    import filmProfile from "./components/user/filmProfile.svelte";

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
        {#if !loggedIn || (loggedIn && admin)}
            <Route path="/adminLogin" component={Login}/>
        {/if}
        {#if admin}
            <Route path="/filmForm/:filmId" component={filmForm}/>
            <Route path="/filmList" component={FilmList}/>
        {/if}

        <!-- RUTAS DE USER -->
        <Route path="/" component={Main}/>
        <Route path="/filmProfile/:filmId" component={filmProfile}/>
        <Route path="/userProfile/:userId" component={ProfileUser}/>
    </Router>

</div>
