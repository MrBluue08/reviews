const mongoose = require('mongoose')

const schema = mongoose.Schema

const filmSchema = new schema(
    {
        title:{
            type:String,
            required:true
        },
        sinopsis:{
            type:String,
            required:true
        },
        director:{
            type:String,
            required:true,
        },
        poster:{
            type:String,
            required:true
        },
        releaseDate:{
            type:String,
            required:true
        }
    }
)

const Film = mongoose.model('Film', filmSchema)
module.exports = Film