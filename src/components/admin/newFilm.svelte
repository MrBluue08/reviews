<main> 
    <form action="submit_movie.php" method="post" enctype="multipart/form-data">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required>

        <label for="director">Director:</label>
        <input type="text" id="director" name="director" required>

        <label for="release_year">Release Year:</label>
        <input type="text" id="release_year" name="release_year" required>

        <label for="genre">Genre:</label>
        <select id="genre" name="genre" required>
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <!-- Add more options as needed -->
        </select>

        <label for="poster">Poster Image:</label>
        <input type="file" id="poster" name="poster" accept="image/*" required>

        <button type="submit">Submit</button>
    </form>
</main>