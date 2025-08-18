/// <reference types="cypress" />

describe("Reqres", function() {
    it("Scenario 1", function() {
        cy.intercept('GET', 'https://reqres.in/api/users?page=1', { fixture: 'users.json' }).as('getUsers');

        cy.visit('http://localhost:5500');

        cy.wait('@getUsers');

        //Assert the mocked data
        cy.get('.user').should('have.length', 2);
        cy.contains('George Bluth').should('exist');
        cy.contains('Janet Weaver').should('exist');
    })
})