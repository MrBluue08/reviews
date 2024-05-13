const express = require('express');
const router = express.Router();
const multer = require('multer');
const Film = require('../models/films');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/upload', upload.single('img'), (req, res) => {
    res.send('Image uploaded');
})

function reviewCount(films){
    films.forEach(film => {
        //Luego vengo
    });
}

router.get('/startFilms', async (req, res) => {
    try {
        let films = await Film.find({}).exec();
        res.status(200).json(films);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getFilm/:filmId', async (req, res) => {
    try {
        let result = await Film.findOne({"_id": req.params.filmId}).exec();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/filmSearch/:search', async (req,res) => {
    try {
        let result = await Film.find({"title": {$regex: new RegExp(req.params.search)}})
        res.status(200).json(result);
    }catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


router.post('/addFilm', async(req, res) => {
    try{
        let result = await Film.findOne({"title": req.body.title}).exec();
        console.log(result);
        if(!result){
            const film = new Film({
                title: req.body.title,
                sinopsis: req.body.sinopsis,
                director: req.body.director,
                poster: req.body.imgName,
                releaseDate: req.body.releaseDate
            });
            await film.save();
            res.status(200).json(film);
        }else{
            res.status(401).send('Film already exists');
        }
    }catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
})



module.exports = router;
