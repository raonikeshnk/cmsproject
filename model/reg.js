const mongoose = require('mongoose')

const regSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName:String,
    lastName:String,
    mobile:Number,
    dob:Date,
    gender:String,
    img:{type:String, default:'default.png'},
    status: {type:String, default:'suspended'},
    creationDate:{type:Date, default: new Date},
    desc:String,
    sub:{type:String, default:'unsubscribed'}
})

module.exports = mongoose.model('reg', regSchema)