/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

describe('Drag and drop', function() {
    it('Scenario 1 - simple drop', function() {
        cy.visit('https://demoqa.com/droppable')

        //Assert the texts
        cy.get('div[id="draggable"]').should('have.text', 'Drag me')
        cy.get('div[id="droppable"]').should('have.text', 'Drop hereDrop hereDrop here')
        cy.contains('Drop here').should('exist')

        //Drag the draggable box into the droppable box
        cy.get('div[id="draggable"]').scrollIntoView().drag('div[id="droppable"]', {force: true}).wait(5000)

        //Assert the text has changed to "Dropped"
        cy.get('div[id="droppable"]').should('have.text', 'Dropped!Drop hereDrop here')
        cy.contains('Dropped!').should('exist')
    })

    it('Scenario 2 - sortable', function() {
        cy.visit('https://demoqa.com/sortable')

        cy.scrollTo('center')

        //Assert the texts in 1 and 2
        cy.get('div[class="list-group-item list-group-item-action"]').eq(0)
        .should('have.text', 'One')
        cy.get('div[class="list-group-item list-group-item-action"]').eq(1)
        .should('have.text', 'Two')
        
        //Drag two over One
        //cy.get('div[class="list-group-item list-group-item-action"]').eq(1)
        //.drag('div[class="list-group-item list-group-item-action"]:eq(0)', {force: true})
        cy.window().then(win => {
            const container = win.document.querySelector('div[class="vertical-list-container mt-4"]');
            const items = container.querySelectorAll('div[class="list-group-item list-group-item-action"]');
            container.insertBefore(items[1], items[0]);
        });

        //cy.wait(5000)

        //Assert that Two is before One
        cy.get('div[class="list-group-item list-group-item-action"]').eq(0)
        .should('have.text', 'Two')
    })
})