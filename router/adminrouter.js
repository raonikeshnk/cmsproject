const router = require('express').Router()
const regc = require('../controller/regcontroller')
const blogc = require('../controller/blogcontroller')
const handlelogin = require('../helpers/logincheckfunction')




router.get('/dashboard',handlelogin, (req,res)=>{
    const username = req.session.username
    res.render('admin/dashboard.ejs', {username})
})

router.get('/user', regc.adminuser)

router.get('/userstatus/:id', regc.statusupdate)





module.exports = router