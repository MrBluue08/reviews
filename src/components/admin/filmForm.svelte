<script>
    import { navigate } from "svelte-navigator";
    import { onMount } from "svelte";


    export let filmId;
    //form Variables
    let title, director, sinopsis, releaseDate;
    let imgInput;
    let preview;

   
    function displayImg() {
        let photo = imgInput.files[0];
        let reader = new FileReader();
        
        reader.onload = function(e) {
            preview.style.display = "inline";
            preview.src = e.target.result;
        };
        
        reader.readAsDataURL(photo);
    }

    async function addFilm(){
        try {
            let photo = new File([imgInput.files[0]], title, {type: file.type} );
            const response = await fetch("http://localhost:5000/film/addFilm", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ title, director, sinopsis, releaseDate })
            });

            const film = await response.json();
            if (!response.ok) {
                throw new Error('Failed to add new film');
            }else{
                const formData = new FormData();
                formData.append('img', photo);
                const uploadedPoster = await fetch("http://localhost:5000/film/upload", {
                     method: 'POST',
                     body: formData
                });

            }
            navigate('/');
            location.reload();

        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function editFilm(){
        try {
            let photo = new File([imgInput.files[0]], title, {type: file.type} );
            console.log(photo);
            const response = await fetch(`http://localhost:5000/film/editFilm/${filmId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ title, director, sinopsis, releaseDate })
            });

            const film = await response.json();
            if (!response.ok) {
                throw new Error('Failed to add new film');
            }else{
                if(imgInput.files.length){
                    const formData = new FormData();
                    formData.append('img', photo);
                    const uploadedPoster = await fetch("http://localhost:5000/film/upload", {
                        method: 'POST',
                        body: formData
                    });
                }
            }

            navigate('/');
            location.reload();
            

        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    let film = {};
    async function getFilm(){
        try {
            const response = await fetch(`http://localhost:5000/film/getFilm/${filmId}`, {
                headers: {"Content-Type": "application/json"},
                method: 'GET'
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error('Server error');
            }
            return res;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    onMount(async () => {
        if(filmId !== "empty"){
            film =  await getFilm();

            title = film.title;
            director = film.director;
            sinopsis = film.sinopsis;
            releaseDate = film.releaseDate;
            preview.style.display = "inline";
            preview.src = `http://localhost:5000/uploads/${film.poster}`;

        }
    });

    async function handleSubmit(){
        if(filmId !== "empty"){
            editFilm();
        }else{
            addFilm();
        }
    }
    

    
</script>

<main> 
    <div class="container">
        <form  on:submit|preventDefault={handleSubmit}  enctype="multipart/form-data">
            <div class="title">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" bind:value={title} required>
            </div>
    
            <div class="director">
                <label for="director">Director:</label>
                <input type="text" id="director" name="director" bind:value={director} required>
            </div>
    
            <div class="releaseDate">
                <label for="release_year">Release Year:</label>
                <input type="date" id="release_year" name="release_year" bind:value={releaseDate} required>
            </div>
    
            <div class="synopsis">
                <label for="synopsis">Synopsis:</label>
                <textarea id="synopsis" name="synopsis" rows="4" bind:value={sinopsis} required></textarea>
            </div>
    
            <div class="img">
                <label for="file" class="file-upload-label">
                    <div class="file-upload-design">
                      <svg viewBox="0 0 640 512" height="1em">
                        <path
                          d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                        ></path>
                      </svg>
                      <span class="browse-button">Browse file</span>
                    </div>
                    <input id="file" type="file" on:change={displayImg}  bind:this={imgInput}/>
                    <img src="" alt="placeholder" class="preview" bind:this={preview}>
                </label>
            </div>
    
            <button type="submit">Submit</button>
        </form>
    </div>
</main>

<style>
    * {
        color: white;
    }

    main {
        display: flex;
        justify-content: center;
    }

    /* Form style */
    form {
        max-width: 400vh;
        margin: 0 auto;
    }

    .container {
        background-color: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .title,
    .director,
    .releaseDate,
    .synopsis,
    .img {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input[type="text"],
    input[type="date"],
    input[type="file"],
    textarea {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        margin-top: 5px;
        resize: none;
    }

    input[type="file"] {
        cursor: pointer;
    }

    button[type="submit"] {
        float: right;
        padding: 10px 20px;
        background-color: #3498db;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button[type="submit"]:hover {
        background-color: #2980b9;
    }

    /* Image style */
    .preview {
        padding-top: 2vh;
        display: none;
        width: 8vw;
    }

    .img {
        display: flex;
    }

    /* Stolen file input style */
    .file-upload-label input {
        display: none;
    }

    .file-upload-label svg {
        height: 50px;
        fill: rgb(82, 82, 82);
        margin-bottom: 20px;
    }

    .file-upload-label {
        cursor: pointer;
        background-color: #ddd;
        padding: 30px 70px;
        border-radius: 40px;
        border: 2px dashed rgb(82, 82, 82);
        box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
    }

    .file-upload-design {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .browse-button {
        background-color: rgb(82, 82, 82);
        padding: 5px 15px;
        border-radius: 10px;
        color: white;
        transition: all 0.3s;
    }

    .browse-button:hover {
        background-color: rgb(14, 14, 14);
    }
</style>