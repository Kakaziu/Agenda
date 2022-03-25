class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass)
        this.divMessages = document.querySelector('.messages')
    }

    submit(){
        this.form.addEventListener('submit', (e) =>{
            e.preventDefault()
            this.divMessages.innerHTML = ''
            this.validate()
        })
    }

    validate(){
        if(!this.senhaValidate() || !this.emailValidate()){
            this.divMessages.classList.add('error-messages-front')
            console.log(this.divMessages)
            return
        }else{
            this.divMessages.classList.remove('error-messages-front')
            this.form.submit()
        }

    }

    senhaValidate(){
        const inputSenha = this.form.querySelector('.senha')

        if(inputSenha.value.length < 3 || inputSenha.value.length > 50){
            this.divMessages.innerHTML += 'A senha deve ter entre 3 e 50 caracteres.<br>'
            return false
        }

        return true
    }

    emailValidate(){
        const inputEmail = this.form.querySelector('.email')
        const re = /\S+@\S+\.\S+/

        if(!re.test(inputEmail.value)){
            this.divMessages.innerHTML += '<br>E-mail inválido.'
            return false
        }

        return true
    }
}

const formCadastro = new Login('.form-cadastro')
const formLogin = new Login('.form-login')

formCadastro.submit()
formLogin.submit()