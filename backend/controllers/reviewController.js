const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');

const getRatings = async (reviews) => {
    let reviewAmount = {};
    let totalRatings = {};

    reviews.forEach(review => {
        if (!(review.film in reviewAmount)) {
            reviewAmount[review.film] = 0;
            totalRatings[review.film] = 0;
        }
        reviewAmount[review.film] += 1;
        totalRatings[review.film] += parseInt(review.rating);
    });

    let assignedRatings = {};
    for (let film in reviewAmount) {
        assignedRatings[film.toString()] = Math.round((totalRatings[film] / reviewAmount[film]) * 10)/10;
    }

    return assignedRatings;
};
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

router.get('/getRatings', async (req, res) => {
    try{
        let result = await Review.find({});
        let ratings = await getRatings(result);
        res.status(200).json(ratings);
    }catch(err){
        console.error(err);
        res.status(500).send("Internal server error")
    }
})

router.post('/postReview', async(req, res) => {
    try{
        const review = new Review({
            user: req.body.userName,
            film: req.body.movie,
            rating: req.body.rating,
            text: req.body.reviewTxt,
            likes: [],
            createdAt: Date.now()
        });
        await review.save();
        res.status(200).json(review);
    }catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
})

router.post('/like', async (req, res) => {
    const user = req.body.userId;
    const reviewId = req.body.review;
    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.likes.includes(user)) {
            let index = review.likes.indexOf(user);
            review.likes.splice(index, 1);
        }else{
            review.likes.push(user);
        }

        await review.save();

        res.status(200).json({ message: 'Review liked', review });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.delete('/dropReview', async (req, res) => {
    try {
        const reviewId = req.body.review;
        await Review.findByIdAndDelete(reviewId);
        res.status(200).send('Review dropped');
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error});
    }
});


router.get('/userReviews/:username', async (req, res) => {
    try {
        const reviews = await Review.find({user: req.params.username});
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error});

    }
})

module.exports = router