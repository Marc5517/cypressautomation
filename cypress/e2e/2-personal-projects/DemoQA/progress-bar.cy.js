/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
});

// test suite name
describe('Progress bar', function() {
    beforeEach('Visit the website before each test', function() {
        cy.visit('https://demoqa.com/progress-bar')
    })
    it('Scenario 1 - Start and wait til 100%', function() {
        //Click on start
        cy.get('button[id="startStopButton"]').click()

        //Check if the bar has reached 100%
        cy.get('div[role="progressbar"]', { timeout: 15000}).should('have.text', '100%')

        //Assert the button's text has changed to "Reset"
        cy.get('button[id="resetButton"]').should('have.text', 'Reset')
    })

    it('Scenario 2 - Reset the progressbar', function() {
        //Click on start
        cy.get('button[id="startStopButton"]').click()

        //Check if the bar has reached 100%
        cy.get('div[role="progressbar"]', { timeout: 25000}).should('have.text', '100%')

        //Click on "Reset"
        cy.wait(5000)
        cy.get('button[id="resetButton"]').click()

        //Assert the bar shows 0%
        cy.get('div[role="progressbar"]').should('have.text', '0%')
    })

    it('Scenario 3 - Stopping the test midway', function() {
        //Click on start
        cy.get('button[id="startStopButton"]').click()

        //Check if the bar has reached between 30% and 100%
        cy.get('div[role="progressbar"]', { timeout: 15000}).should(function($el) {
            const percent = parseInt($el.text())
            expect(percent).to.be.within(30, 99)
        })

        //Click on the "Stop" button
        cy.get('button[id="startStopButton"]').click()
        
        //Assert that the progress bar is at 42%
        cy.get('div[role="progressbar"]').invoke('text').then((text) => {
            const value = parseInt(text)
            expect(value).to.be.within(30, 99)
        })

        //Assert the button's text is "Start"
        cy.get('button[id="startStopButton"]').should('have.text', 'Start')
    })
})