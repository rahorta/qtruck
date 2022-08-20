describe('login', () => {
  it('deve logar no Qtruck com sucesso', () => {
    const user = {
      name: 'Rodolfo',
      instagram: '@rodolfo',
      password: '1234senha'
    }
    cy.login(user)
    cy.loggedUser(user.name)
  })

  it('não deve logar com senha incorreta', () => {
    const user = {
      instagram: '@rodolfo',
      password: '123456'
    }
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })

  it('não deve logar com instagram incorreto', () => {
    const user = {
      instagram: '@not-a-user',
      password: '1234senha'
    }
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })
  
  it('instagram deve ser obrigatório', ()=>{
    const user = {
      password: '1234senha'
    }
    cy.login(user)
    cy.modalHaveText('Por favor, informe o seu código do Instagram!')
  })

  it('senha deve ser obrigatória', ()=>{
    const user = {
      instagram: '@rodolfo'
    }
    cy.login(user)
    cy.modalHaveText('Por favor, informe a sua senha secreta!')
  })

  it('todos os campos devem ser obrigatórios', ()=>{
    cy.login({})
    cy.modalHaveText('Por favor, informe suas credenciais!')
  })
})
