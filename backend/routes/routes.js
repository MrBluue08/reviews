const express = require('express')
const router = express.Router()

const userCont = require('../controllers/userController');
router.use('/user', userCont);



module.exports = router
