const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');


router.post('/registerUser',async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            username: req.body.userName,
            password: hashedPassword
        })
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/login', async (req, res) =>{
    try{
        const result = await User.findOne({ $or: [{email: req.body.idLog}, {username: req.body.idLog}]});
        const correctPassword = await bcrypt.compare(req.body.password, result.password);
        if(!result || !correctPassword){
            res.status(401).send('Incorrect credentials');
        }else{
            res.status(200).json(result); 
        }
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/getUser/:userName', async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.userName});
        return res.status(200).json(user);
    } catch (error) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;