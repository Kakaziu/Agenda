class Contato{
    constructor(){
        this.form = document.querySelector('.form')
    }
   
    submit(){
        this.form.addEventListener('submit', (e) =>{
            e.preventDefault()
            this.validate()
        })
    }

    validate(){
        if(this.nomeValidate() && this.contatoValidate()){
            this.form.submit()
        }
    }

    nomeValidate(){
        const inputNome = this.form.querySelector('.nome')
        const errorNome = this.form.querySelector('.error-nome')

        errorNome.textContent = ''

        if(!inputNome.value){
            errorNome.textContent = '* O campo nome precisa ser preenchido.'
            return 
        }

        return true
    }

    contatoValidate(){
        const inputEmail = this.form.querySelector('.email')
        const inputTel = this.form.querySelector('.telefone')
        const errorEmail = this.form.querySelector('.error-email')
        const errorTel = this.form.querySelector('.error-tel')
        const re = /\S+@\S+\.\S+/

        errorEmail.textContent = ''
        errorTel.textContent = ''

        if(inputEmail.value && !re.test(inputEmail.value)){
            errorEmail.textContent = '* E-mail inválido.'
            return
        }

        if(!inputEmail.value && !inputTel.value){
            errorEmail.textContent = '* Selecione uma forma de contato'
            errorTel.textContent = '* Selecione uma forma de contato'

            return
        }

        return true
    }
}

const formContato = new Contato()

formContato.submit()