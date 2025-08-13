/// <reference types="cypress" />

// test suite name
describe('Test with click', function() {
    it('Scenario 1', function () {
        // test step for URL
        cy.visit("https://register.rediff.com/register/register.php")
        //select option 19th with value then verify with assertion
        cy.get('select[class="day"]').select('19').should('have.value', '19')
        //select option OCT with value then verify with assertion
        cy.get('select[class="middle month"]').select('10').should('have.value', '10')
        //select option 1998 with value then verify with assertion
        cy.get('select[class="year"]').select('1998').should('have.value', '1998')
        //select option Denmark with value then verify with assertion
        cy.get('select[id="country"]').select('59').should('have.value', '59')
    })
})