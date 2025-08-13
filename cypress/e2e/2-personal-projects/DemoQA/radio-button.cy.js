/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

// test suite name
describe('Radio button', function() {
    it('Scenario 1 - Radio buttons', function() {
        //Visit the website
        cy.visit('https://demoqa.com/radio-button')

        //Click on "yes"
        cy.get('input[id="yesRadio"]').click({force: true})

        //Assert the text
        cy.get('p[class="mt-3"]').should('have.text', 'You have selected Yes')
        
        //Click on "Impressive"
        cy.get('input[id="impressiveRadio"]').click({force: true})

        //Assert the text
        cy.get('p[class="mt-3"]').should('have.text', 'You have selected Impressive')

        //Assert "No" is unclicked
        cy.get('input[id="noRadio"]').should('be.disabled')
    })
})