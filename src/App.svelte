<script>
  import { Router, Route } from "svelte-navigator";
    import RegisterUser from "./components/user/registerUser.svelte";
</script>


<Router basepath="/reviews">
    <Route path="/register">
        <RegisterUser/>
    </Route>
</Router>