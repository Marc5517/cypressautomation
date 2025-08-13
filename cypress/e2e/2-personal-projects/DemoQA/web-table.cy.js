/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

// test suite name
describe('Web table manipulation', function() {
    beforeEach('Visit the website', function() {
        //Visit the website
        cy.visit('https://demoqa.com/webtables')

        //Fixture
        cy.fixture('web-user').as('user')
    })

    it('Scenario 1 - Add', function() {
        //Click on "Add"
        cy.get('button[id="addNewRecordButton"]').click()

        cy.get('@user').then(function(user) {
            //Add info and click on submit
            cy.get('input[id="firstName"]').type(user.firstName).should('have.value', user.firstName)
            cy.get('input[id="lastName"]').type(user.lastName).should('have.value', user.lastName)
            cy.get('input[id="userEmail"]').type(user.userEmail).should('have.value', user.userEmail)
            cy.get('input[id="age"]').type(user.age).should('have.value', user.age)
            cy.get('input[id="salary"]').type(user.salary).should('have.value', user.salary)
            cy.get('input[id="department"]').type(user.department).should('have.value', user.department)
            cy.get('button[id="submit"]').click()

            //Assert that a new row has been added, and it contains the info that was added earlier
            cy.get('div[class="rt-tbody"] .rt-tr-group').filter(function(index, row) {
                const text = Cypress.$(row).text().trim()
                return text.length > 0 && !text.includes('No rows found')
            })
            .should('have.length', 4)
            
            cy.get('div[class="rt-tr-group"]').contains(user.firstName).parent().within(function() {
                cy.contains(user.lastName)
                cy.contains(user.lastName)
                cy.contains(user.userEmail)
                cy.contains(user.age)
                cy.contains(user.salary)
                cy.contains(user.department)
            })
        })
    })

    it('Scenario 2 - Edit', function() {
        //Assert Cierra is there
        cy.get('div[class="rt-tbody"]').contains('.rt-tr-group', 'Vega')

        //Edit the fields name and department
        cy.get('span[id="edit-record-1"]').click()
        cy.get('input[id="department"]').clear().type('QA').should('have.value', 'QA')
        cy.get('input[id="salary"]').clear().type('45000').should('have.value', '45000')
        
        //Submit
        cy.get('button[id="submit"]').click()

        //Assert the changes are there in the 1st row
        cy.get('div[class="rt-tr-group"]').contains('Vega').parent().within(function() {
            cy.contains('45000')
            cy.contains('QA')
            cy.should('not.contain', 'Cierra')
            cy.should('not.contain', 'Insurance')
        })
    })

    it('Scenario 3 - Delete', function() {
        //Assert that Kierra exist
        cy.contains('Kierra').should('exist')
        
        //Find and delete a user
        cy.get('span[id="delete-record-3"]').scrollIntoView().click()

        //Assert that the row doesn't exist
        cy.contains('Kierra').should('not.exist')
    })

    it('Scenario 4 - Sorting and searching', function() {
        //Insert "Cierra" in the search field
        cy.get('input[id="searchBox"]').type("Alden")

        //Assert that one row exists
        cy.get('div[class="rt-tbody"] .rt-tr-group').filter(function(index, row) {
            const text = Cypress.$(row).text().trim()
            return text.length > 0 && !text.includes('No rows found')
        })
        .should('have.length', 1).first().within(function() {
            cy.get('.rt-td').eq(0).should('contain', 'Alden')
        })

        cy.get('input[id="searchBox"]').clear()
        cy.wait(500)

        //Preparing before sorting age
        function getAges() {
            const ages = []
            return cy.get('div[class="rt-tbody"] .rt-tr-group').then($rows => {
                $rows.each(function(_, row) {
                    const cells = Cypress.$(row).find('.rt-td')
                    const age = Cypress.$(cells[2]).text().trim()
                    if (age) ages.push(age)
                })
            return ages
            })
        }

        //Sort by age
        cy.contains('Age').click()
        
        //Assert that the sorting is correct
        getAges().then(function(ages) {
            const sorted = [...ages].sort((a, b) => Number(a) - Number(b))
            expect(ages).to.deep.equal(sorted)
        })
    })

    it('Scenario 5 - Empty field', function() {
        //Click on Add
        cy.get('button[id="addNewRecordButton"]').click()

        //Click on submit without filling out any field
        cy.get('button[id="submit"]').click()

        //Assert that the fields are red
        cy.get('input[id="firstName"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('input[id="lastName"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('input[id="userEmail"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('input[id="age"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('input[id="salary"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('input[id="department"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')
    })
})