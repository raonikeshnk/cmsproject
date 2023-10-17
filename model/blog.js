const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    email:String,
    title:String,
    blog:String,
    createDate:{type:Date, default:Date.now},
    status:{type:String,default:'active'}
})

module.exports = mongoose.model('blog', blogSchema)