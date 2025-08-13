/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
});

const homeURL = 'https://demoqa.com'

describe('Links', function() {
    beforeEach('Visit the website', function() {
        //Visit the website
        cy.visit('https://demoqa.com/links')
    })
    it('Scenario 1 - Simple link', function() {
        //Assert the link opens in a new tab and points to the correct URL
        cy.get('a[id="simpleLink"]').should('have.attr', 'target', '_blank')
        .and('have.attr', 'href', homeURL)

        //Check the status code is 200
        cy.request(homeURL).its('status').should('eq', 200)
    })

    it('Scenario 2a - Dynamic link', function() {
        //Assert the link opens in a new tab and points to the correct URL
        cy.get('a[id="dynamicLink"]').should('have.attr', 'target', '_blank')
        .and('have.attr', 'href', homeURL)
        
        //Check the status code is 200
        cy.request(homeURL).its('status').should('eq', 200)
    })

    it('Scenario 2b - Dynamic link (Alternative)', function() {
        //Assert the link opens in a new tab and points to the correct URL
        cy.get('a[id="dynamicLink"]').should('have.attr', 'target', '_blank')
        .and('have.attr', 'href').then(function(href) {
            //Validate the href points to a reachable URL
            cy.request(href).its('status').should('eq', 200)
        })
    })
})