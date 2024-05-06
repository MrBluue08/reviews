const express = require('express');
const router = express.Router();
const Admin = require('../models/admins');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) =>{
    try{
        const result = await Admin.findOne({username: req.body.username});
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



module.exports = router;
