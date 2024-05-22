const express = require('express');
const router = express.Router();
const multer = require('multer');
const Film = require('../models/films');

function changeFileName(str) {
    str = str.replace(/:/g, "");
    str = str.trim();
    let words = str.split(/\s+/);
    let result = words.map(word => word.toLowerCase()).join("_");
    result += "_poster.jpg";
    
    return result;
}


async function assignPosters(films) {
    let posters = {};
    films.forEach(film => {
        posters[film.title] = film.poster;
    });
    return posters;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, changeFileName(file.originalname));
    }
});

const upload = multer({storage: storage});

router.post('/upload', upload.single('img'), (req, res) => {
    res.send('Image uploaded');
})


router.get('/startFilms', async (req, res) => {
    try {
        let films = await Film.find({}).sort({ title: 1 }).exec();
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

router.get('/filmSearch/:search', async (req, res) => {
    try {
        let searchQuery = req.params.search;
        
        if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.trim() === '') {
            return res.status(400).json({ error: "Invalid search query" });
        }
        let regex = new RegExp(searchQuery.trim(), 'i');
        let result = await Film.find({ "title": { $regex: regex } }).sort({ title: 1 });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getPosters', async (req, res) => {
    try {
        let result = await Film.find({});
        let posters = await assignPosters(result);
        res.status(200).json(posters);
    }catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/editFilm/:id', async (req, res) => {
    try {
        let film = await Film.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            sinopsis: req.body.sinopsis,
            director: req.body.director,
            poster: changeFileName(req.body.title),
            releaseDate: req.body.releaseDate
        }, { new: true }).exec();

        if (!film) {
            return res.status(404).json({ error: 'Film not found' });
        }

        res.status(200).json(film);
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
})


router.post('/addFilm', async(req, res) => {
    try{
        let result = await Film.findOne({"title": req.body.title}).exec();
        let posterName = changeFileName(req.body.title);
        if(!result){
            const film = new Film({
                title: req.body.title,
                sinopsis: req.body.sinopsis,
                director: req.body.director,
                poster:  posterName,
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
