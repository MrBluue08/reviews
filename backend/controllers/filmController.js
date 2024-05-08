const express = require('express');
const router = express.Router();
const film = require('../models/films');

router.get('/startFilms', async (req, res) => {
    try {
        let films = await film.find({}).exec();
        res.status(200).json(films);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getFilm/:filmId', async (req, res) => {
    try {
        let result = await film.findOne({"_id": req.params.filmId}).exec();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/filmSearch/:search', async (req,res) => {
    try {
        let result = await film.find({"title": {$regex: new RegExp(req.params.search)}})
        res.status(200).json(result);
    }catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;
