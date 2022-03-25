const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: { type: String, required: false},
    email: {type: String, required: false},
    telefone: {type: String, required: false},
    criadoEm: {type: Date, default: Date.now}
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato{
    constructor(body){
        this.body = body
        this.errors = []
        this.contato = null
    }

    static async buscaId(id){
        if(typeof id !== 'string') return

        const contato = await ContatoModel.findById(id)
        return contato
    }

    static async buscaContatos(){
        const contatos = await ContatoModel.find()
          .sort({ criadoEm: -1 })

        return contatos
    }

    static async delete(id){
        if(typeof id !== 'string') return

        const contato = await ContatoModel.findByIdAndDelete(id)
        return contato
    }

    async register(){
        this.valida()
        if(this.errors.length > 0) return
        await this.contatoExist()
        if(this.errors.length > 0) return

        this.contato = await ContatoModel.create(this.body)
    }

    valida(){
        this.cleanUp()

        if(!this.body.nome) this.errors.push('O campo nome é obrigatório.')
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')
        if(!this.body.email && !this.body.telefone) this.errors.push('Selecione uma forma de contato.')
    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !=='string'){
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }

    async contatoExist(){
        const contato = await ContatoModel.findOne({
            email: this.body.email 
        }) 
        || await ContatoModel.findOne({
           telefone: this.body.telefone
        }) 

        if(contato) this.errors.push('Este contato já existe.')
    }

    async edit(id){
        if(typeof id !== 'string') return
        this.valida()
        if(this.errors.length > 0) return

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
    }
}

module.exports = Contato