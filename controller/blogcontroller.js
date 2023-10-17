const Blog = require('../model/blog')

exports.blogsection = async(req, res) => {
    const username = req.session.username
    const record = await Blog.find({email:username})
    res.render('blog.ejs', { username, record })
}

exports.blogform = (req, res) => {
    const username = req.session.username
    res.render('blogform.ejs', { username })
}
exports.blogadd = (req, res) => {
    const username = req.session.username
    const { title, blog } = req.body
    const record = new Blog({email: username,title: title,blog: blog,})
    record.save()
    res.redirect('/yourblogs')
}

exports.allblog = async(req,res)=>{
    const username = req.session.username
    const record = await Blog.find({status:'active'}).sort({createDate:-1})
    res.render('allblog.ejs',{username, record})
}