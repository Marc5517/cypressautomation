/// <reference types="cypress" />

// test suite name
describe('Test Cypress.io', function() {
    it ('scenario 1 - visit the website and insert e-mail', function() {
        //Visit the website
        cy.visit('https://example.cypress.io/commands/actions')

        //Insert email
        cy.get('.action-email').type('fake@email.com').should('have.value', 'fake@email.com')
        
        //Click on submit
        cy.contains('submit').click().wait(500)
    })

    it ('scenario 2 - checkbox and dropdown', function () {
        //Visit the website
        cy.visit('https://example.cypress.io/commands/actions')

        //Check one checkbox
        cy.get('input[value="checkbox1"]').check().should('be.checked')

        //Uncheck one checkbox
        cy.get('input[value="checkbox1"]').uncheck().should('not.be.checked')

        //Check all checkboxes
        cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked')

        //Repeat with radiobuttons
        cy.get('input[type="radio"]').first().check().should('be.checked')
        cy.get('.action-radios [type="radio"]').not('[disabled]').check().should('be.checked')
        cy.get('input[type="radio"]').first().should('be.not.checked')

        //Check forcefully
        cy.get('input[value="checkbox2"]').check({force: true}).should('be.checked')

        //Dropdown two times
        cy.get('select[class="form-control action-select"]').select('apples').should('have.value', 'fr-apples')
        cy.get('.action-select').select('bananas').should('have.value', 'fr-bananas')

        //Check that all the options are in the dropdown
        cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas']).invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])
    })

    it ('scenario 3 - URL and navigation', function() {
        //Visit the website
        cy.visit('https://example.cypress.io')

        //Click on "Utilities"
        cy.contains('Utilities').click()

        //Check to see if it's the right website
        cy.url().should('not.equal', 'https://example.cypress.io')
        cy.url().should('include', '/utilities')

        //Click on "Cypress API" and confirm it's that website
        cy.contains('Cypress API').click()
        cy.url().should('not.equal', 'https://example.cypress.io')
        cy.url().should('include', '/cypress-api')

        //Go back to the former page and later forward
        cy.go('back')
        cy.url().should('include', '/utilities')
        cy.go('forward')
        cy.url().should('include', '/cypress-api')
        cy.go(-2)
        cy.url().should('equal', 'https://example.cypress.io/')
    })

    it ('scenario 4 - Double click', function() {
        //Visit the website
        cy.visit('https://example.cypress.io/commands/actions')

        //Double click
        cy.get('.action-div').dblclick().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
        cy.get('.action-input-hidden').should('be.visible').clear().type('Something, or... whatever. Sue me! Discord was here!!!')

    })

    it ('scenario 5 - Check the title', function() {
        //Visit the website
        cy.visit('https://example.cypress.io')

        //Look for the title "Cypress"
        cy.title().should('include', 'Cypress')

        //Click on "Querying"
        cy.contains('Querying').click({force: true}).wait(500)

        //Look for the headline "Querying"
        cy.get('h1').should('have.text', 'Querying')
    })
})