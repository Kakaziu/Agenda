class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass)
        this.divMessages = document.querySelector('.messages')
    }

    submit(){
        this.form.addEventListener('submit', (e) =>{
            e.preventDefault()
            this.validate()
        })
    }

    validate(){
        if(this.emailValidate() && this.senhaValidate()){
            this.form.submit()
        }
    }

    emailValidate(){
        const inputEmail = this.form.querySelector('.email')
        const errorEmail = this.form.querySelector('.error-email')
        const re = /\S+@\S+\.\S+/

        errorEmail.textContent = ''

        if(!re.test(inputEmail.value)){
            errorEmail.textContent = '* E-mail inválido.'
            return
        }

        return true
    }

    senhaValidate(){
        const inputSenha = this.form.querySelector('.senha')
        const errorSenha = this.form.querySelector('.error-senha')

        errorSenha.textContent = ''

        if(inputSenha.value.length < 3 || inputSenha.value.length > 50){
            errorSenha.textContent = '* Senha entre 3 e 50 caracteres.'
            return
        }

        return true
    }
}

const formCadastro = new Login('.form-cadastro')
const formLogin = new Login('.form-login')

formCadastro.submit()
formLogin.submit()