import modal from '../components/Modal'

class MapPage {

    constructor() {
        this.modal = modal
    }

    loggedUser(name) {
        cy.get('.logged-user')
            .should('be.visible')
            .should('have.text', 'Olá, ' + name)
    }
}

export default new MapPage()