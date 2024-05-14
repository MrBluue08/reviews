const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');

router.get('/getReviews/:type/:id', async (req, res) => {
    try{
        let tipo = req.params.type;
        let query = {};
        query[tipo] = req.params.id;
        let result = await Review.find(query);
        res.status(200).json(result);
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }

})

router.post('/postReview', async(req, res) => {
    try{
        const review = new Review({
            user: req.body.userName,
            film: req.body.movie,
            rating: req.body.rating,
            text: req.body.reviewTxt,
            createdAt: Date.now()
        });
        await review.save();
        res.status(200).json(review);
    }catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
})

module.exports = router