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

    it('não deve cadasstrar com instagram duplicado', () => {
        const user = {
            name: 'Zidane',
            instagram: '@zidane',
            password: '123456'
        }

        cy.apiCreateUser(user)

        signupPage.register(user)
        signupPage.modal.haveText('Instagram já cadastrado!')
    })
})


