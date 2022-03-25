exports.middlewarePrimeiro = (req, res, next) =>{
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
} 

exports.csrfCheck = (err, req, res, next) =>{
    if(err){
        res.send('ERRO')
        return
    }
}

exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired = (req, res, next) =>{
    if(!req.session.user){
        res.redirect('/')
        return
    }

    next()
}