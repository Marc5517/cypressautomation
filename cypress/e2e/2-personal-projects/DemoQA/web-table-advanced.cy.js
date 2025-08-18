/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

// test suite name
describe('Web-table - advanced', function() {
    beforeEach('Visit the website', function() {
        //Visit the website
        cy.visit('https://demoqa.com/webtables')

    })

    it('Scenario 1 - Validate the context', function() {
        //Assert that there are 10 rows
        cy.get('div[class="rt-tbody"]').find('.rt-tr-group').should('have.length', 10)

        //Assert that the filled rows are filled
        cy.get('div[class="rt-tbody"] .rt-tr-group').each(function($row) {
            cy.wrap($row).within(function() {
                cy.get('.rt-td').each(function($cell) {
                    cy.wrap($cell).invoke('text').should('not.be.empty')
                })
            })
        })

        //Assert that each row has an edit button
        cy.get('div[class="rt-tbody"] .rt-tr-group').each(function($row) {
            // Asserts that the row isn't empty
            const rowText = $row.text().trim()

            if (rowText.length > 0 && !rowText.includes('No rows found')) {
                // Goes into the row and looks for the edit-button
                cy.wrap($row).within(() => {
                    cy.get('[title="Edit"]').should('exist')
                })
            } else {
                cy.log('Empty row – Move on!')
            }
        })
    })

    it('Scenario 2a - Sorting names', function() {
        function getFirstNames() {
            const firstNames = []
            return cy.get('div[class="rt-tbody"] .rt-tr-group').then($rows => {
                $rows.each(function(_, row) {
                    const cells = Cypress.$(row).find('.rt-td')
                    const firstName = Cypress.$(cells[0]).text().trim()
                    if (firstName) firstNames.push(firstName)
                })
            return firstNames
            })
        }
        
        // Click to sort the first names
        cy.contains('First Name').click()
        
        getFirstNames().then(function(firstNames) {
            const sorted = [...firstNames].sort((a, b) => a.localeCompare(b))
            expect(firstNames).to.deep.equal(sorted)
        })

        // Click again to sort it in a descending way
        cy.contains('First Name').click()

        getFirstNames().then(function(firstNamesDesc) {
            const sortedDesc =[...firstNamesDesc].sort((a, b) => b.localeCompare(a))
            expect(firstNamesDesc).to.deep.equal(sortedDesc)
        })
    })

    it('Scenario 2b - Sorting age', function() {
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
        
        // Click to sort age
        cy.contains('Age').click()
        
        getAges().then(function(ages) {
            const sorted = [...ages].sort((a, b) => Number(a) - Number(b))
            expect(ages).to.deep.equal(sorted)
        })

        // Click again to sort it in a descending way
        cy.contains('Age').click()

        getAges().then(function(agesDesc) {
            const sortedDesc =[...agesDesc].sort((a, b) => Number(b) - Number(a))
            expect(agesDesc).to.deep.equal(sortedDesc)
        })
    })

    it('Scenario 3 - Filtering and deleting', function() {
        cy.fixture('web-user').as('user')

        //Insert "Cierra" in the search field
        cy.get('input[id="searchBox"]').type("Cierra")

        //Assert that one row exists
        cy.get('div[class="rt-tbody"] .rt-tr-group').filter(function(index, row) {
            const text = Cypress.$(row).text().trim()
            return text.length > 0 && !text.includes('No rows found')
        })
        .should('have.length', 1).first().within(function() {
            cy.get('.rt-td').eq(0).should('contain', 'Cierra')
            cy.get('.rt-td').eq(5).should('contain', 'Insurance')
        })

        //Delete the row
        cy.get('span[id="delete-record-1"]').click()

        //Assert that the text "No rows found" is there
        cy.contains('No rows found').should('exist')

        //Clear the search field and assert that the other rows are there
        cy.get('input[id="searchBox"]').clear()
        cy.get('div[class="rt-tbody"] .rt-tr-group').filter(function(_, row) {
            const text = Cypress.$(row).text().trim()
            return text.length > 0 && !text.includes('No rows found')
        })
        .should('have.length', 2)

        //Assert that "Cierra" is no longer in the table
        cy.contains('Cierra').should('not.exist')

        //Add a new row
        cy.get('button[id="addNewRecordButton"]').click()
        cy.get('@user').then(function(user) {
            cy.get('input[id="firstName"]').type(user.firstName).should('have.value', user.firstName)
            cy.get('input[id="lastName"]').type(user.lastName).should('have.value', user.lastName)
            cy.get('input[id="userEmail"]').type(user.userEmail).should('have.value', user.userEmail)
            cy.get('input[id="age"]').type(user.age).should('have.value', user.age)
            cy.get('input[id="salary"]').type(user.salary).should('have.value', user.salary)
            cy.get('input[id="department"]').type(user.department).should('have.value', user.department)
            cy.get('button[id="submit"]').click()

            //Assert the new row is there
            cy.get('input[id="searchBox"]').clear()
            cy.get('div[class="rt-tbody"] .rt-tr-group').filter(function(index, row) {
                const text = Cypress.$(row).text().trim()
                return text.length > 0 && !text.includes('No rows found')
            })
            .should('have.length', 3).last().within(function() {
                cy.get('.rt-td').eq(0).should('contain', user.firstName)
                cy.get('.rt-td').eq(3).should('contain', user.userEmail)
                cy.get('.rt-td').eq(5).should('contain', user.department)
            })
        })
    })
})