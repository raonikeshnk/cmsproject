function handlesuspend(req,res,next){
    if(req.session.status!=='suspended'){
        next()
    }else{
        res.render('suspendedmessage.ejs'   )
    }
}

module.exports  = handlesuspend