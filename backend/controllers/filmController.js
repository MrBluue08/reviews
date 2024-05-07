const express = require('express');
const router = express.Router();
const film = require('../models/films');

router.get('/startFilms', async (req, res) => {
    try {
        let films = await film.find({}).exec();
        console.log(films);
        res.json(films);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getFilm/:filmId', async (req, res) => {
    try {
        let result = await film.findOne({"_id": req.params.filmId}).exec();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
