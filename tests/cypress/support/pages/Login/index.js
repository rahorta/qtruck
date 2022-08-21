import modal from '../components/Modal'

class LoginPage {

    constructor() {
        this.modal = modal
    }

    go() {
        cy.visit('/')
    }

    fillForm(user) {
        if (user.instagram) cy.get('input[name=instagram').type(user.instagram)
        if (user.password) cy.get('input[name=password').type(user.password)
    }

    submit() {
        cy.contains('button', 'Entrar').click()
    }

    logar(user) {
        this.go()
        this.fillForm(user)
        this.submit()
    }
}

export default new LoginPage()