const Contato = require('../models/ContatoModel')

exports.paginaInicial = async (req, res) =>{
    const contato = await Contato.buscaContatos()
    res.render('index', {contato}) 
} 

