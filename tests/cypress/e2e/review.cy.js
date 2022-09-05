import mapPage from '../support/pages/Map'
import foodTruckPage from '../support/pages/Foodtruck'

describe('Food Trucks Reviews', ()=>{

    it('should send a new review', () =>{
        const user = {
            name: 'Madruga Ramon',
            instagram: '@madruguinha',
            password: '123456'
        }

        const foodtruck = {
            latitude: '-23.584642248123703',
            longitude: '-46.67472571134568',
            name: 'Super de Quico',
            details: 'High quality juices straight from the bag.',
            opening_hours: '2pm - 8pm',
            open_on_weekends: false
        } 

        const review = {
            comment: 'The lemmon juice was amazing, but very little.',
            stars: 2
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.goToFoodtruck(foodtruck.name)
        foodTruckPage.addReview(review)

        foodTruckPage.checkReview(user, review)
    })
})