const express = require('express')
const router = express.Router()

const userCont = require('../controllers/userController');
router.use('/user', userCont);

const filmCont = require('../controllers/filmController');
router.use('/film', filmCont);

const adminCont = require('../controllers/adminController');
router.use('/admin', adminCont);



module.exports = router
