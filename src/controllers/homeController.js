const Contato = require('../models/ContatoModel')

exports.paginaInicial = async (req, res) =>{
    try{
        const contato = await Contato.buscaContatos()
        res.render('index', {contato}) 
    }catch(e){
        res.render('404')
    }
} 

