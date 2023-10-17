const router = require('express').Router()
const regc = require('../controller/regcontroller')
const blogc = require('../controller/blogcontroller')
const handlelogin = require('../helpers/logincheckfunction')
const checksubscription = require('../helpers/checksubscription')
const upload = require('../helpers/multer')


router.get('/', regc.loginpage)
router.post('/', regc.logincheck)
router.get('/reg', regc.registerpage)
router.post('/reg', regc.register)
router.get('/emailvarify/:id', regc.emailverify )
router.get('/forgotform', regc.forgotform)
router.post('/forgotform', regc.forgotsendlink)
router.get('/forgotpasswordlink/:id', regc.forgotpasswordlink)
router.post('/forgotpasswordlink/:id', regc.forgotpasswordchanged)
router.get('/logout', regc.logout)
router.get('/userprofiles', regc.userprofiles)
router.get('/profile',handlelogin, regc.profileupdateform)
router.post('/profile',upload.single('img'), regc.profileupdate)
router.get('/contactdetails:id',handlelogin,regc.contactdetails)
router.get('/yourblogs', handlelogin,blogc.blogsection)
router.get('/blogadd',handlelogin,  blogc.blogform)
router.post('/blogadd', blogc.blogadd)
router.get('/allblog', handlelogin, blogc.allblog)




module.exports = router