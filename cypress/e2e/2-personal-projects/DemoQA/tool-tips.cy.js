/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
});

// test suite name
describe('Tool tips', function() {
    beforeEach('Visit the website', function() {
        cy.visit('https://demoqa.com/tool-tips')
    })
    it('Scenario 1 - Button', function() {
        //Find the button and hover at it
        cy.get('button[id="toolTipButton"]').trigger('mouseover')

        //Assert the text
        cy.get('div[class="tooltip-inner"]').should('be.visible').and('have.text', 'You hovered over the Button')
    })

    it('Scenario 2 - Text 1', function() {
        //Find the text and hover at it
        cy.contains('Contrary').trigger('mouseover')

        //Assert the text
        cy.get('div[class="tooltip-inner"]').should('be.visible').and('have.text', 'You hovered over the Contrary')
    })

    it('Scenario 3 - Text 2', function() {
        //Find the text and hover at it
        cy.contains('1.10.32').trigger('mouseover')

        //Assert the text
        cy.get('div[class="tooltip-inner"]').should('be.visible').and('have.text', 'You hovered over the 1.10.32')
    })

    it('Scenario 4 - Text field', function() {
        //Find the text field and hover at it
        cy.get('input[id="toolTipTextField"]').trigger('mouseover')

        //Assert the text
        cy.get('div[class="tooltip-inner"]').should('be.visible').and('have.text', 'You hovered over the text field')
    })

    it('Scenario 5 - Button, texts and text field', function() {
        //Find the button and the texts
        cy.get('button[id="toolTipButton"]').trigger('mouseover')
        cy.get('input[id="toolTipTextField"]').trigger('mouseover')
        cy.contains('Contrary').trigger('mouseover')
        cy.contains('1.10.32').trigger('mouseover')

        //Assert the texts
        cy.get('div[class="tooltip-inner"]').eq(0).should('be.visible').and('have.text', 'You hovered over the Button')
        cy.get('div[class="tooltip-inner"]').eq(1).should('be.visible').and('have.text', 'You hovered over the text field')
        cy.get('div[class="tooltip-inner"]').eq(2).should('be.visible').and('have.text', 'You hovered over the Contrary')
        cy.get('div[class="tooltip-inner"]').eq(3).should('be.visible').and('have.text', 'You hovered over the 1.10.32')
    })
})