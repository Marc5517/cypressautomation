/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

// test suite name
describe('Check box', function() {
    it('Scenario 1 - Clicking and validating', function() {
        //Visit the website
        cy.visit('https://demoqa.com/checkbox')

        //Click on the arrow
        cy.get('button[title="Toggle"]').click()

        //Check it and assert it's checked
        cy.get('input[id="tree-node-desktop"]').check({force: true}).should('be.checked')

        //Click on the arrow and assert that "notes" and "commands" are checked
        cy.get('li[class="rct-node rct-node-parent rct-node-collapsed"], button[title="Toggle"]').eq(2).click()
        cy.get('input[id="tree-node-notes"]').should('be.checked')
        cy.get('input[id="tree-node-commands"]').should('be.checked')

        //Uncheck it
        cy.get('input[id="tree-node-desktop"]').uncheck({force: true})

        //Assert that "notes" and "commands" are unchecked
        cy.get('input[id="tree-node-notes"]').should('not.be.checked')
        cy.get('input[id="tree-node-commands"]').should('not.be.checked')
    })
})