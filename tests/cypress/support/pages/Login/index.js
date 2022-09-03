import modal from '../components/Modal'

class LoginPage {

    constructor() {
        this.modal = modal
    }

    go(lat = '-23.55052', long = '-46.633309') {
        cy.visit('/', this.mockLocation(lat, long))
    }

    fillForm(user) {
        if (user.instagram) cy.get('input[name=instagram').type(user.instagram)
        if (user.password) cy.get('input[name=password').type(user.password)
    }

    submit() {
        cy.contains('button', 'Entrar').click()
    }

    mockLocation(latitude, longitude) {
        return {
            onBeforeLoad(win) {
                cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb, err) => {
                    if (latitude && longitude) {
                        return cb({ coords: { latitude, longitude } })
                    }
                    throw err({ code: 1 })
                })
            }
        }
    }

    login(user) {
        this.go()
        this.fillForm(user)
        this.submit()
    }
}

export default new LoginPage()