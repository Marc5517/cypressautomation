/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

const username = "somename"
const email = "some@email.com"
const currentAddress = "Someplace 45"

// test suite name
describe('Text box', function() {
    it ('Scenario 1', function() {
        //Visit the website
        cy.visit('https://demoqa.com/text-box')

        //Insert name, email and adresse
        cy.get('input[id="userName"]').type(username).should('have.value', username)
        cy.get('input[id="userEmail"]').type(email).should('have.value', email)
        cy.get('textarea[id="currentAddress"]').type(currentAddress).should('have.value', currentAddress)

        //Click on "Submit"
        cy.get('button[id="submit"]').click()

        //Verify if the results are correct
        cy.get('div[id="output"]').should('contain', username)
        cy.get('div[id="output"]').should('contain', email)
        cy.get('div[id="output"]').should('contain', currentAddress)
    })
})