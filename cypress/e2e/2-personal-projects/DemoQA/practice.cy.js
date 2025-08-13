/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

describe('Practice', function() {
    const firstName = 'Marc'
    const lastName = 'Fordsmand'
    const userEmail = 'marc@fordsmand.dk'
    const phoneNumber = '12345678'
    const femaleName = 'Anna'
    const femaleLastName = 'Hansen'
    const femaleEmail = 'anna@hansen.dk'
    const femaleNumber = '11223344'
    const address = 'Nørregade 5'

    beforeEach('Visiting the website', function() {
        //Visit the website
        cy.visit('https://demoqa.com/automation-practice-form')
    })

    it('Scenario 1 - Simple interaction and assertion', function () {
        //Fill out the empty fields
        cy.get('input[id="firstName"]').type(firstName).should('have.value', firstName)
        cy.get('input[id="lastName"]').type(lastName).should('have.value', lastName)
        cy.get('input[id="userEmail"]').type(userEmail).should('have.value', userEmail)
        cy.get('[for="gender-radio-1"]').click()
        cy.get('input[id="userNumber"]').type(phoneNumber).should('have.value', phoneNumber)

        //Submit
        cy.get('button[id="submit"]').click()

        //Assert the modal and it's content
        cy.get('.modal-content').should('be.visible')
        cy.contains('Thanks for submitting the form').should('exist')
        cy.contains(firstName + ' ' + lastName).should('exist')
        cy.contains(userEmail).should('exist')

        //Close the modal
        cy.get('button[id="closeLargeModal"]').click({ force: true})

        //Assert that the modal is closed
        cy.get('.modal-content').should('not.exist')
    })

    it('Scenario 2 - Empty fields', function() {
        //Submit
        cy.get('button[id="submit"]').click()

        //Check if the error shows up at the required fields
        cy.get('input[id="firstName"]').should('match', ':invalid')
        cy.get('input[id="lastName"]').should('match', ':invalid')
        cy.get('input[id="userNumber"]').should('match', ':invalid')

        //Assert the red areas
        cy.get('[for="gender-radio-1"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('[for="gender-radio-2"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('[for="gender-radio-3"]').should('have.css', 'border-color', 'rgb(220, 53, 69)')

        //Check if the error doesn't show up at the non-required fields
        cy.get('input[id="userEmail"]').should('not.match', ':invalid')
        cy.get('input[id="dateOfBirthInput"]').should('not.match', ':invalid')
        cy.get('div[id="subjectsContainer"]').should('not.match', ':invalid')
        cy.get('input[id="uploadPicture"]').should('not.match', ':invalid')
        cy.get('textarea[id="currentAddress"]').should('not.match', ':invalid')
        cy.get('div[id="state"]').should('not.match', ':invalid')
        cy.get('div[id="city"]').should('not.match', ':invalid')

        //Assert the green areas
        cy.get('[for="hobbies-checkbox-1"]').should('have.css', 'border-color', 'rgb(40, 167, 69)')
        cy.get('[for="hobbies-checkbox-2"]').should('have.css', 'border-color', 'rgb(40, 167, 69)')
        cy.get('[for="hobbies-checkbox-3"]').should('have.css', 'border-color', 'rgb(40, 167, 69)')
        
        //Assert modal is not visible
        cy.get('.modal-content').should('not.exist')
    })

    it('Scenario 3 - Advanced interaction and assertion', function() {
        //Fill out the required fields
        cy.get('input[id="firstName"]').type(femaleName).should('have.value', femaleName)
        cy.get('input[id="lastName"]').type(femaleLastName).should('have.value', femaleLastName)
        cy.get('input[id="userEmail"]').type(femaleEmail).should('have.value', femaleEmail)
        cy.get('[for="gender-radio-2"]').click()
        cy.get('input[id="userNumber"]').type(femaleNumber).should('have.value', femaleNumber)

        //Pick out a date
        cy.get('input[id="dateOfBirthInput"]').click()
        cy.get('select[class="react-datepicker__month-select"]').select('3')
        cy.get('select[class="react-datepicker__year-select"]').select('1990')
        cy.get('div[class="react-datepicker__day react-datepicker__day--010"]').click()
        cy.get('input[id="dateOfBirthInput"]').should('have.value', '10 Apr 1990')

        //Pick out the two hobbies
        cy.get('[for="hobbies-checkbox-2"]').click()
        cy.get('[for="hobbies-checkbox-3"]').click()

        //Upload a picture
        cy.get('input[id="uploadPicture"]').attachFile('anna.jpeg')

        //Insert address
        cy.get('textarea[id="currentAddress"]').type(address).should('have.value', address)

        //Submit
        cy.get('button[id="submit"]').click()

        //Assert the modal
        cy.get('.modal-content').should('be.visible')
        cy.get('div[class="modal-title h4"]').should('contain', 'Thanks for submitting the form')

        //Assert the content of the modal
        cy.contains('td', 'Student Name').next().should('contain', femaleName + ' ' + femaleLastName)
        cy.contains('td', 'Student Email').next().should('contain', femaleEmail)
        cy.contains('td', 'Gender').next().should('contain', 'Female')
        cy.contains('td', 'Mobile').next().should('contain', femaleNumber)
        cy.contains('td', 'Date of Birth').next().should('contain', '10 April,1990')
        cy.contains('td', 'Hobbies').next().should('contain', 'Reading, Music')
        cy.contains('td', 'Picture').next().should('contain', 'anna.jpeg')
        cy.contains('td', 'Address').next().should('contain', address)

        //Close the modal
        cy.get('button[id="closeLargeModal"]').click({ force: true})
        cy.get('.modal-content').should('not.exist')
    })
})