const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema(
    {
        email: {
            type:String,
            required:true,
            unique:true
        },
        username: {
            type:String,
            required:true,
            unique:true
        },
        password: {
            type:String,
            required:true
        },
        profileImg: {
            type:String
        }
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User