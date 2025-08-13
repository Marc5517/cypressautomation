/// <reference types="cypress" />

// test suite name
describe('Saucedemo', function() {
    const username = 'standard_user'
    const password = 'secret_sauce'

    it ('Scenario 1', function() {
        //Visit the website
        cy.visit('https://www.saucedemo.com/')

        //Insert username and password
        cy.get('input[placeholder="Username"]').type(username).should('have.value', username)
        cy.get('input[placeholder="Password"]').type(password).should('have.value', password)

        //Click on "Login"
        cy.get('input[type="submit"]').click()

        //Check if it's new page
        cy.url().should('not.equal', 'https://www.saucedemo.com/')
        cy.url().should('include', '/inventory')

        //Look for “Sauce Labs Backpack”
        cy.contains('Sauce Labs Backpack').should('exist')
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')
    })
})