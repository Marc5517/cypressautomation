/// <reference types="cypress" />

// test suite name
describe('Test with click', function() {
    it('Scenario 1', function () {
        // test step for URL
        cy.visit("https://accounts.google.com")
        // Click on button
        cy.contains('Next').click()
        cy.contains('Enter an email or phone number').should('exist')
    })
    it('Scenario 2', function() {
        cy.visit("https://accounts.google.com")
        // Find text field and insert email
        cy.get('input[name="identifier"]').type('email@email.com')
        // Click on button
        cy.contains('Next').click()
        // Check if you're in a new page
        cy.contains('sign you in').should('exist')
        // Click on the other buttons
        cy.contains('Help').click()
        cy.contains('Privacy').click()
        cy.contains('Terms').click()
        // Click on try again
        cy.contains('Try again').click({force: true})
        // Check if it's on the danish site
        cy.contains('Log ind').should('exist')
    })
    it('Scenario 3', function() {
        cy.visit("https://accounts.google.com")
        // Find text field and insert email
        cy.get('input[name="identifier"]').type('email@email.com')
        // Click on button
        cy.contains('Next').click()
        // Check if you're in a new page
        cy.contains('sign you in').should('exist')
        // Click on try again
        cy.contains('Try again').click({force: true})
        // Check if it's on the danish site
        cy.contains('Log ind').should('exist')
        // Insert email on the Danish site
        cy.get('input[name="identifier"]').type('email2@email2.com')
        // Click on button
        cy.contains('Næste').click()
        // Click on all three Danish buttons
        cy.contains('Hjælp').click()
        cy.contains('Privatliv').click()
        cy.contains('Vilkår').click()
        // Click on Danish try again
        cy.contains('Prøv igen').click({force:true})
    })
})