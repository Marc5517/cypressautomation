/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
});

// test suite name
describe('Modal', function() {
    beforeEach('Visit the website', function() {
        cy.visit('https://demoqa.com/modal-dialogs')
    })

    it('Scenario 1 - Small Modal', function() {
        //Click on "Small Modal"
        cy.get('button[id="showSmallModal"]').click()

        //Assert the modal's title
        cy.get('div.modal-title').should('have.text', 'Small Modal')

        //Assert the modal's body
        cy.get('div.modal-body').should('have.text', 'This is a small modal. It has very less content')

        //Close the modal
        cy.get('button[id="closeSmallModal"]').should('be.visible').click()

        //Assert the modal doesn't exist anymore
        cy.get('div[class="modal-content"]', { timeout: 3000 }).should('not.exist')
    })

    it('Scenario 2 - Large Modal', function() {
        //Click on Large Modal
        cy.get('Button[id="showLargeModal"]').click()

        //Assert the modal's title
        cy.get('div.modal-title').should('have.text', 'Large Modal')

        //Assert the modal's body start with "Lorem Ipsum"
        cy.get('div.modal-body').invoke('text').should('match', /^Lorem Ipsum/)

        //Close the modal
        cy.get('button[id="closeLargeModal"]').should('be.visible').click()

        //Assert the modal doesn't exist
        cy.get('div[class="modal-content"]', { timeout: 3000 }).should('not.exist')
    })
})