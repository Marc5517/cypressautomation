/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

describe('Dynamic properties', function() {
    beforeEach('Visit the website', function() {
        //Visit the website
        cy.visit('https://demoqa.com/dynamic-properties')
    })

    it('Scenario 1 - Visible after 5 seconds', function() {
        //See if the button is visible after 5 seconds
        cy.get('button[id="visibleAfter"]', { timeout: 7000}).should('be.visible').click()
    })

    it('Scenario 2a - Color change after 5 seconds', function() {
        //Check to see if the color has not changed
        cy.get('button[id="colorChange"]').should('have.class', 'mt-4 btn btn-primary')
        
        //See if the button changes color after 5 seconds
        cy.get('button[id="colorChange"]', { timeout: 7000}).should('have.class', 'mt-4 text-danger btn btn-primary')
    })

    it('Scenario 2b - Color change after 5 seconds (alternative)', function() {
        //See if the button changes color after 5 seconds
        cy.get('button[id="colorChange"]').invoke('attr', 'class').then(function(initialClass) {
            cy.wait(7000)
            cy.get('button[id="colorChange"]').invoke('attr', 'class').should('not.eq', initialClass)
        })
    })

    it('Scenario 3 - Enable after 5 seconds', function() {
        //See if the button is disabled
        cy.get('button[id="enableAfter"]').should('not.be.enabled')
        
        //See if the button is enable after 5 seconds
        cy.get('button[id="enableAfter"]', { timeout: 7000}).should('be.enabled').click()
    })
})