const Reg = require('../model/reg')
const Blog = require('../model/blog')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");


exports.loginpage = (req, res) => {
    res.render('login.ejs', { message: '' })
}
exports.logincheck = async (req, res) => {
    const { us, pass } = req.body
    const record = await Reg.findOne({ email: us })
    if (record !== null) {
        const passwordcheck = await bcrypt.compare(pass, record.password)
        if (passwordcheck) {
            if (record.status == 'suspended') {
                res.render('login.ejs', { message: 'Your email is not verify please check your email and verify' })
            } else {
                req.session.isAuth = true
                req.session.username = record.email
                req.session.userid = record.id
                if (record.email == 'admin@gmail.com') {
                    res.redirect('/admin/dashboard')
                } else {
                    res.redirect('/userprofiles')
                }
            }
        } else {
            res.render('login.ejs', { message: 'Wrong password' })
        }
    } else {
        res.render('login.ejs', { message: 'Wrong Credentials' })
    }
}

exports.registerpage = (req, res) => {
    res.render('reg.ejs', { message: '' })
}
exports.register = async (req, res) => {
    const { username, password } = req.body
    const converpass = await bcrypt.hash(password, 10)
    const usercheck = await Reg.findOne({ email: username })
    if (usercheck == null) {
        const record = new Reg({ email: username, password: converpass })
        record.save()
        res.render('reg.ejs', { message: 'Success account has beed created' })
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: 'indiancoding.alwar@gmail.com',
                pass: 'zximmxfhwrgqsocm'
            }
        });
        console.log('connected to smtp server')
        const info = await transporter.sendMail({
            from: 'indiancoding.alwar@gmail.com', // sender address
            to: username, // list of receivers
            subject: "Email Confirmation - Web Project 2", // Subject line
            text: "Please click on below to verify your email", // plain text body
            html: `<a href=http://localhost:4000/emailvarify/${record.id}>Verify</a>`, // html body
        });
        console.log('verification email sent')
    } else {
        res.render('reg.ejs', { message: `${username} is already register` })
    }

}
exports.emailverify = async (req, res) => {
    const id = req.params.id
    await Reg.findByIdAndUpdate(id, { status: 'active' })
    res.render('emailverifymessage.ejs')
}

exports.forgotform = (req, res) => {
    res.render('forgotform.ejs', { message: '' })
}
exports.forgotsendlink = async (req, res) => {
    const { us } = req.body
    const record = await Reg.findOne({ email: us })
    if (record !== null) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: 'indiancoding.alwar@gmail.com',
                pass: 'zximmxfhwrgqsocm'
            }
        });
        console.log('connected to gmail smtp server')
        const info = await transporter.sendMail({
            from: 'indiancoding.alwar@gmail.com', // sender address
            to: us, // list of receivers
            subject: "Password change link - Web Project 2", // Subject line
            text: "Please click on below to reset password", // plain text body
            html: `<a href=http://localhost:4000/forgotpasswordlink/${record.id}>Reset Password</a>`, // html body
        });
        console.log('password reset email sent')
        res.render('forgotlinkmessage.ejs')
    }
    else {
        res.render('forgotform.ejs', { message: "email isn't registred with us" })
    }
}

exports.forgotpasswordlink = (req, res) => {
    const id = req.params.id
    res.render('forgotpasswordform.ejs')
}
exports.forgotpasswordchanged = async (req, res) => {
    const { newpass } = req.body
    const id = req.params.id;
    const cpass = await bcrypt.hash(newpass, 10)
    await Reg.findByIdAndUpdate(id, { password: cpass })
    res.render('changepasswordlink.ejs')
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

exports.adminuser = async (req, res) => {
    const username = req.session.username
    const record = await Reg.find()
    res.render('admin/user.ejs', { username, record })
}
exports.statusupdate = async (req, res) => {
    const id = req.params.id
    const record = await Reg.findById(id)
    let newStatus = null
    if (record.status == 'active') {
        newStatus = 'suspended'
    } else {
        newStatus = 'active'
    }
    await Reg.findByIdAndUpdate(id, { status: newStatus })
    await Blog.findByIdAndUpdate(id,{status: newStatus})
    res.redirect('/admin/user')
}

exports.userprofiles = async(req, res) => {
    const username = req.session.username
    const record = await Reg.find({img:{$nin:['default.png']}})
    res.render('usersprofile.ejs', { username,record })
}
exports.profileupdateform = async (req, res) => {
    const username = req.session.username
    const record = await Reg.findById(req.session.userid)
    // console.log(record)
    res.render('profileupdateform.ejs', { message: '', username, record })
}
exports.profileupdate = async (req, res) => {
    const userid = req.session.userid
    const username = req.session.username
    const record = await Reg.findById(userid)
    const { fname, lname, mobile, dob, gender, about } = req.body
    if (req.file) {
        const filename = req.file.filename
        await Reg.findByIdAndUpdate(userid, { firstName: fname, lastName: lname, mobile: mobile, dob: dob, gender: gender,desc:about, img: filename })
    } else {
        await Reg.findByIdAndUpdate(userid, { firstName: fname, lastName: lname, mobile: mobile, dob: dob, gender: gender, desc:about })
    }
    res.render('profileupdateform', { message: 'Successfully Profile has been updated', username, record })
}
exports.contactdetails=(req,res)=>{
    const id = req.session.id
    res.render('suberror.ejs',{id})
}

