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
      name: 'Rodolfo',
      instagram: '@rodolfo',
      password: '123456'
    }
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })

  it('não deve logar com instagram incorreto', () => {
    const user = {
      name: 'Rodolfo',
      instagram: '@not-a-user',
      password: '1234senha'
    }
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })
})
