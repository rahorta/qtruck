// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* Cypress.Commands.add('login', (user) => {
  cy.visit('/')

  if (user.instagram) cy.get('input[name=instagram').type(user.instagram)
  if (user.password) cy.get('input[name=password').type(user.password)

  cy.contains('button', 'Entrar').click()
}) */

/* Cypress.Commands.add('modalHaveText', (text) => {
  cy.get('.swal2-html-container')
    .should('be.visible')
    .should('have.text', text)
}) */

/* Cypress.Commands.add('loggedUser', (name) => {
  cy.get('.logged-user')
    .should('be.visible')
    .should('have.text', 'Olá, ' + name)
}) */
import loginPage from './pages/Login'
import mapPage from './pages/Map'

Cypress.Commands.add('apiResetUser', (instagram) => {
  cy.request({
    url: 'http://localhost:3333/helpers-reset',
    method: 'DELETE',
    qs: { instagram: instagram }
  }).then(response => {
    expect(response.status).to.eql(204)
  })
})

Cypress.Commands.add('apiCreateUser', (payload) => {
  cy.apiResetUser(payload.instagram)

  cy.request({
    url: 'http://localhost:3333/signup',
    method: 'POST',
    body: payload
  }).then(response => {
    expect(response.status).to.eql(201)
  })
})

Cypress.Commands.add('apiCreateFoodTruck', (payload) => {
  cy.request({
    url: 'http://localhost:3333/foodtrucks',
    method: 'POST',
    headers: {
      'Authorization': Cypress.env('token')
    },
    body: payload
  }).then(response => {
    expect(response.status).to.eql(201)
  })
})

Cypress.Commands.add('apiLogin', (user) => {
  const payload = {
    instagram: user.instagram,
    password: user.password
  }

  cy.request({
    url: 'http://localhost:3333/sessions',
    method: 'POST',
    body: payload
  }).then(response => {
    expect(response.status).to.eql(200)
    Cypress.env('token', response.body.token)
  })
})

Cypress.Commands.add('uiLogin', (user) => {
  loginPage.go('-23.584548837854058', '-46.674446913517876')
  loginPage.fillForm(user)
  loginPage.submit()

  mapPage.loggedUser(user.name)
})

Cypress.Commands.add('setGeolocation', (lat, long) => {
  localStorage.setItem('qtruck:latitude', lat)
  localStorage.setItem('qtruck:longitude', long)
})