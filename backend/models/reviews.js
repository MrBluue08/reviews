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
        text:{
            type:String,
            required:true,
        },
        createdAt: {type: Date, default: Date.now}
    }
)

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review