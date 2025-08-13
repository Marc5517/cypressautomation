/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

// test suite name
describe('Buttons', function() {
    it('Scenario 1 - Dobble click, right click and one click', function() { 
        //Visit the website
        cy.visit('https://demoqa.com/buttons')

        //Dobble click
        cy.get('button[id="doubleClickBtn"]').dblclick()

        //Right click
        cy.get('button[id="rightClickBtn').rightclick()

        //Click
        cy.get('button').filter(':contains("Click Me")').eq(2).click()
        
        //Assert the texts are there
        cy.get('p[id="doubleClickMessage"]').should('have.text', 'You have done a double click')
        cy.get('p[id="rightClickMessage"]').should('have.text', 'You have done a right click')
        cy.get('p[id="dynamicClickMessage"]').should('have.text', 'You have done a dynamic click')
    })
})