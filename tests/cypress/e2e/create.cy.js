import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Create Food Truck', () => {

    it('should indicate a new Food Truck', () => {
        const user = {
            name: 'Ronaldinho Gaúcho',
            instagram: '@bruxoR10',
            password: '123456'
        }

        const foodtruck = {
            latitude: '-23.584548837854058',
            longitude: '-46.674446913517876',
            name: 'Tienda Del Chavo',
            details: 'The best place to drink a lemmon juice that looks like currant and taste like tamarind.',
            opening_hours: '2pm - 8pm',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        createPage.fillForm(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Food truck cadastrado com sucesso!')

    })

    it('must not allow to create a foodtruck with a duplicated name', ()=>{
        const user = {
            name: 'Neymar JR',
            instagram: '@njr10',
            password: '123456'
        }

        const foodtruck = {
            latitude: '-23.583654062428796',
            longitude: '-46.67752861976624',
            name: 'Churros of Dona Florinda',
            details: 'The best mexican churros in the city',
            opening_hours: '3pm - 7pm',
            open_on_weekends: false
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.createLink()
        createPage.fillForm(foodtruck)
        createPage.submit()
        createPage.modal.haveText('Esse food truck já foi cadastrado!')
    })

    it('todos os campos são obrigatórios', ()=> {
        const user = {
            name: 'Cristiano Ronaldo',
            instagram: '@cr7',
            password: '123456'
        }

        const foodtruck = {
            latitude: '-23.584548837854058',
            longitude: '-46.674446913517876',
        }

        cy.apiCreateUser(user)
        cy.uiLogin(user)

        mapPage.createLink()
        cy.setGeolocation(foodtruck.latitude, foodtruck.longitude)
        createPage.submit()

        const message = 'Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!'
        createPage.modal.haveText(message)
    })
})