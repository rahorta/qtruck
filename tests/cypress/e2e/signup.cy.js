import signupPage from '../support/pages/Signup'

describe('Signup', () => {
    it('should create a new user', () => {
        const user = {
            name: "Ronaldo Fenomeno",
            instagram: "@ronaldo9",
            password: 'pwd123'
        }

        /* DELETING DIRECTLY INTO THE DATA BASE
        cy.deleteMany({instagram: user.instagram}, { collection: 'users'}).then(res => { 
            cy.log(res); 
        }) */

        cy.apiResetUser(user.instagram)

        signupPage.register(user)
        signupPage.modal.haveText('Agora você pode recomendar e/ou avaliar Food trucks.')

    })

    it('must not allow using an already registered instagram', () => {
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


