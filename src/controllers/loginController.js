const Login = require('../models/LoginModel')

exports.paginaLogin = (req, res) =>{
    if(req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.register = async (req, res) =>{
    try{
        const login = new Login(req.body)
        await login.register()

        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(() => res.redirect('/login/index'))
            return
        }

        req.flash('success', 'Usuário cadastrado')
        req.session.save(() => res.redirect('/login/index'))
        return
    }catch(e){ 
        res.render('404')
    }
}

exports.login = async (req, res) =>{
    try{
        const login = new Login(req.body)
        await login.login()

        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(() => res.redirect('/login/index'))
            return
        }

        req.flash('success', 'Você entrou no sistema')
        req.session.user = login.user
        req.session.save(() => res.redirect('/login/index'))
        return
    }catch(e){
        res.render('404')
    }
}

exports.logout = (req, res) =>{
    req.session.destroy()
    res.redirect('/')
}