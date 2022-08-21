import signupPage from '../support/pages/Signup'

describe('Signup', ()=>{
    it('deve cadastrar novo usuário', () =>{
        const user = {
            name: "Ronaldo Fenomeno",
            instagram: "@ronaldo9",
            password: 'pwd123'
        }

        signupPage.register(user)
        signupPage.modal.haveText('Agora você pode recomendar e/ou avaliar Food trucks.')

    })
})