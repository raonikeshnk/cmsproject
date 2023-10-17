const express = require('express')
const app = express()
app.use(express.urlencoded({extended:false}))
const adminRouter = require('./router/adminrouter')
const frontendRouter = require('./router/frontendrouter')
const session = require('express-session')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/cmsproject')

app.use(session({
    secret:'Nikesh',
    resave:false,
    saveUninitialized:false
}))


app.use(frontendRouter)
app.use('/admin', adminRouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(4000, ()=>{console.log('Server is Running on Port 4000')})