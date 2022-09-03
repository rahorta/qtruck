import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

describe('login', () => {
  it('should login on Qtruck successfully', () => {
    const user = {
      name: 'Rodolfo',
      instagram: '@rodolfo',
      password: '1234senha'
    }

    loginPage.logInto(user)
    mapPage.loggedUser(user.name)
  })

  it('must not log with invalid password', () => {
    const user = {
      instagram: '@rodolfo',
      password: '123456'
    }
    loginPage.logInto(user)
    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
  })

  it('must not log with invalid instagram', () => {
    const user = {
      instagram: '@not-a-user',
      password: '1234senha'
    }
    loginPage.logInto(user)
    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
  })
  
  it('instagram must be a required field', ()=>{
    const user = {
      password: '1234senha'
    }
    loginPage.logInto(user)
    loginPage.modal.haveText('Por favor, informe o seu código do Instagram!')
  })

  it('password must be a required field', ()=>{
    const user = {
      instagram: '@rodolfo'
    }
    loginPage.logInto(user)
    loginPage.modal.haveText('Por favor, informe a sua senha secreta!')
  })

  it('all field must be required', ()=>{
    loginPage.go()
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe suas credenciais!')
  })
})
