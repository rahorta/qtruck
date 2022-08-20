describe('login', () => {
  it('deve logar no Qtruck com sucesso', () => {
    cy.visit('/')

    cy.get('input[name=instagram').type('@rodolfo')
    cy.get('input[name=password').type('1234senha')

    cy.contains('button', 'Entrar').click()

    cy.get('.logged-user')
    .should('be.visible')
    .should('have.text', 'Olá, Rodolfo')
  })

  it('não deve logar com senha incorreta', () =>{
    cy.visit('/')

    cy.get('input[name=instagram').type('@rodolfo')
    cy.get('input[name=password').type('senhaInvalida')

    cy.contains('button', 'Entrar').click()

    cy.get('.swal2-html-container')
    .should('be.visible')
    .should('have.text', 'Credenciais inválidas, tente novamente!')
  })

  it('não deve logar com instagram incorreto', () =>{
    cy.visit('/')

    cy.get('input[name=instagram').type('@not-a-user')
    cy.get('input[name=password').type('123456')

    cy.contains('button', 'Entrar').click()

    cy.get('.swal2-html-container')
    .should('be.visible')
    .should('have.text', 'Credenciais inválidas, tente novamente!')
  })
})