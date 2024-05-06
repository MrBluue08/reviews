const mongoose = require('mongoose')

const schema = mongoose.Schema

const adminSchema = new schema(
    {
        username: {
            type:String,
            required:true,
            unique:true
        },
        password: {
            type:String,
            required:true
        }
    }
)

const admin = mongoose.model('admins', adminSchema)
module.exports = admin