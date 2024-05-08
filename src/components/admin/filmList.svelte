<script>
    import {SearchIcon} from "svelte-feather-icons";

    async function getFilms(){
        try {
            const response = await fetch("http://localhost:5000/film/startFilms", {
                headers: {"Content-Type": "application/json"},
                method: 'GET'
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return res;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

</script>

<style>
    main{
        display: flex;
        justify-content: center;
    }
    .list{
        width: 60%;
    }


    /* Stolen searchbar style */
    .search-box{
        width: fit-content;
        height: fit-content;
        position: relative;
    }
    .input-search{
        height: 50px;
        width: 50px;
        border-style: none;
        padding: 10px;
        font-size: 18px;
        letter-spacing: 2px;
        outline: none;
        border-radius: 25px;
        transition: all .5s ease-in-out;
        background-color: #22a6b3;
        padding-right: 40px;
        color:red;
    }
    .input-search::placeholder{
        color:rgba(255,255,255,.5);
        font-size: 18px;
        letter-spacing: 2px;
        font-weight: 100;
    }
    .btn-search{
        width: 50px;
        height: 50px;
        border-style: none;
        font-size: 20px;
        font-weight: bold;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        position: absolute;
        right: 0px;
        color:#ffffff ;
        background-color:transparent;
        pointer-events: painted;  
    }
    .btn-search:focus ~ .input-search{
        width: 300px;
        border-radius: 0px;
        background-color: transparent;
        border-bottom:1px solid rgba(255,255,255,.5);
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    }
    .input-search:focus{
        width: 300px;
        border-radius: 0px;
        background-color: transparent;
        border-bottom:1px solid rgba(255,255,255,.5);
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    }
    
</style>

<main>
    <div class="list">
        <div class="search-box">
            <button class="btn-search">
                <SearchIcon />
            </button>
            <input type="text" class="input-search" placeholder="Type to Search...">
        </div>
    </div>
</main>