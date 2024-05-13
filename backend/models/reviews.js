const mongoose = require('mongoose')

const schema = mongoose.Schema

const reviewSchema = new schema(
    {
        user:{
            type:String,
            required:true
        },
        film:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true,
        },
        poster:{
            type:String,
            required:true
        }
    }
)

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review