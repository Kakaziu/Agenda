const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    nome: String,
    idade: Number
})

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel