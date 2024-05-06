const express = require('express')
const router = express.Router()

const userCont = require('../controllers/userController');
router.use('/user', userCont);

const filmCont = require('../controllers/filmController');
router.use('/film', filmCont);

const adminCont = require('../controllers/adminController');
router.use('/admin', adminCont);

const reviewCont = require('../controllers/reviewController');
router.use('/review', reviewCont);


module.exports = router
