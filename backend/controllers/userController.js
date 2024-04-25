const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/registerUser',async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).send("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;