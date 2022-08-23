import signupPage from '../support/pages/Signup'

describe('Signup', () => {
    it('deve cadastrar novo usuário', () => {
        const user = {
            name: "Ronaldo Fenomeno",
            instagram: "@ronaldo9",
            password: 'pwd123'
        }

        /* cy.deleteMany({instagram: user.instagram}, { collection: 'users'}).then(res => { 
            cy.log(res); 
        }) */

        cy.apiResetUser(user.instagram)

        signupPage.register(user)
        signupPage.modal.haveText('Agora você pode recomendar e/ou avaliar Food trucks.')

    })
})


Cypress.Commands.add('apiResetUser', (instagram) => {
    cy.request({
        url: 'http://localhost:3333/helpers-reset',
        method: 'DELETE',
        qs: { instagram: instagram }
    }).then(response => {
        expect(response.status).to.eql(204)
    })
})