import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

describe('login', () => {
  it('deve logar no Qtruck com sucesso', () => {
    const user = {
      name: 'Rodolfo',
      instagram: '@rodolfo',
      password: '1234senha'
    }

    loginPage.logar(user)
    mapPage.loggedUser(user.name)
  })

  it('não deve logar com senha incorreta', () => {
    const user = {
      instagram: '@rodolfo',
      password: '123456'
    }
    loginPage.logar(user)
    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
  })

  it('não deve logar com instagram incorreto', () => {
    const user = {
      instagram: '@not-a-user',
      password: '1234senha'
    }
    loginPage.logar(user)
    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
  })
  
  it('instagram deve ser obrigatório', ()=>{
    const user = {
      password: '1234senha'
    }
    loginPage.logar(user)
    loginPage.modal.haveText('Por favor, informe o seu código do Instagram!')
  })

  it('senha deve ser obrigatória', ()=>{
    const user = {
      instagram: '@rodolfo'
    }
    loginPage.logar(user)
    loginPage.modal.haveText('Por favor, informe a sua senha secreta!')
  })

  it('todos os campos devem ser obrigatórios', ()=>{
    loginPage.go()
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe suas credenciais!')
  })
})
