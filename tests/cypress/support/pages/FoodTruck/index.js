class FoodTruckPage {

    addReview(review) {
        cy.get('textarea[name=comment]').type(review.comment)
        cy.get(`input[name=stars][value="${review.stars}"]`)
            .click({ force: true })
        cy.contains('button', 'Enviar avaliação').click()
    }

    checkUserNameReview(name) {
        cy.get('strong')
            .should('be.visible')
            .should('have.text', name)
    }

    checkUserInstagramReview(instagram) {
        cy.get('.details > span')
            .should('be.visible')
            .should('have.text', instagram)
    }

    checkReviewStars(stars) {
        cy.get(`:nth-child(${stars}) > path`)
            .should('be.visible')
    }

    checkReviewComment(comment) {
        cy.get('.comment')
            .should('be.visible')
            .should('have.text', comment)
    }
    
    checkReview(user, review) {
        this.checkUserNameReview(user.name)
        this.checkUserInstagramReview(user.instagram)
        this.checkReviewStars(review.stars)
        this.checkReviewComment(review.comment)
    }
}

export default new FoodTruckPage()