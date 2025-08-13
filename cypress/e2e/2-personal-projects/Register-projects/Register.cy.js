/// <reference types="cypress" />

// test suite name
describe('Test with register rediff', function() {
    //saved examples
    const name = 'Marc Steen Fordsmand'
    const rediffemail = 'MSF'
    const password = 's0mepassw0rd'
    const day = 19
    const month = 10
    const year = '1998'
    const mail = 'some@mail.com'
    const number = 23456789
     
    beforeEach(() => {
        // test step for URL
        cy.visit("https://register.rediff.com/register/register.php")
    })

    it('Scenario 1', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        
        //Insert Mail ID and click for availability check
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        cy.get('input[value="Check availability"]').click().wait(500)
        cy.contains('Sorry, the ID that you are looking for is taken.').should('exist')
        
        //Choose the first suggestion
        cy.get('[type="radio"]').first().check()
        cy.get('input[value="Check availability"]').click().wait(500)
        cy.contains('Sorry, the ID that you are looking for is taken.').should('not.exist')
        cy.contains("Yippie! The ID you've chosen is available.").should('exist')
        
        //Insert password two times
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        
        //select option 19th with value then verify with assertion
        cy.get('select[class="day"]').select(day).should('have.value', day)
        
        //select option OCT with value then verify with assertion
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        
        //select option 1998 with value then verify with assertion
        cy.get('select[class="year"]').select(year).should('have.value', year)
        
        //Click on different gender two times
        cy.get('input[value="f"]').check().should('be.checked')
        cy.get('input[value="m"]').check().should('be.checked')
        
        //select option Denmark with value then verify with assertion
        cy.get('select[id="country"]').select('59').should('have.value', '59')
        
        //Click on checkbox
        cy.get('input[type="checkbox"]').check().should('be.checked')
        cy.get('input[type="checkbox"]').uncheck().should('not.be.checked')

        //Check that the input fields for security password are not visible
        cy.contains('Select a Security Question').should('not.be.visible')
        cy.contains('Enter an Answer').should('not.be.visible')
        cy.contains("Mother's Maiden Name").should('not.be.visible')
        
        //Enter recovery mail
        cy.get('input[placeholder="Enter recovery email"]').type(mail).should('have.value', mail)
        
        //Enter phone number
        cy.get('input[id="mobno"]').type(number).should('have.value', number)
        
        //Enter captcha (though it will fail, since it changes every time)
        cy.get('input[placeholder="Enter Captcha"]').type('CDYY').should('have.value', 'CDYY')
        cy.get('input[id="Register"]').click()
        
        //Check if the url is different
        cy.url().should('not.equal', 'https://register.rediff.com/register/register.php')
        
        //Check the text on the new site
        cy.contains('Sorry! We will not be able to register you right now.').should('exist')
        
        //Go back to the former site
        cy.go('back').wait(500)
        
        //Check the website
        cy.url().should('be.equal', 'https://register.rediff.com/register/register.php')
    })

    it('Scenario 2', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        
        //Insert Mail ID and click for availability check
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        cy.get('input[value="Check availability"]').click().wait(500)
        cy.contains('Sorry, the ID that you are looking for is taken.').should('exist')
        
        //Choose the first suggestion
        cy.get('[type="radio"]').first().check()
        cy.get('input[value="Check availability"]').click().wait(500)
        cy.contains('Sorry, the ID that you are looking for is taken.').should('not.exist')
        cy.contains("Yippie! The ID you've chosen is available.").should('exist')
        
        //Insert password two times
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        
        //select option 19th with value then verify with assertion
        cy.get('select[class="day"]').select(day).should('have.value', day)
        
        //select option OCT with value then verify with assertion
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        
        //select option 1998 with value then verify with assertion
        cy.get('select[class="year"]').select(year).should('have.value', year)
        
        //Click on different gender two times
        cy.get('input[value="f"]').check().should('be.checked')
        cy.get('input[value="m"]').check().should('be.checked')
        
        //select option Denmark with value then verify with assertion
        cy.get('select[id="country"]').select('59').should('have.value', '59')
        
        //Click on checkbox
        cy.get('input[type="checkbox"]').check().should('be.checked')

        //Check to see that email-input is no longer visible
        cy.contains("My Recovery Email ID").should('not.be.visible')
        cy.get('input[placeholder="Enter recovery email"]').should('not.be.visible')
        
        //Select question
        cy.contains('Select a Security Question').parent().find('select').select('What is your favourite food?')
        
        //Enter answer
        cy.contains('Enter an Answer').parent().find('input').type('Carbonara')

        //Enter mother's maiden name
        cy.contains("Mother's Maiden Name").parent().find('input').type('Johanna')
        
        //Enter phone number
        cy.get('input[id="mobno"]').type(number).should('have.value', number)
        
        //Enter captcha (though it will fail, since it changes every time)
        cy.get('input[placeholder="Enter Captcha"]').type('CDYY').should('have.value', 'CDYY')
        cy.get('input[id="Register"]').click()
        
        //Check if the url is different
        cy.url().should('not.equal', 'https://register.rediff.com/register/register.php')
        
        //Check the text on the new site
        cy.contains('Sorry! We will not be able to register you right now.').should('exist')
        
        //Go back to the former site
        cy.go('back').wait(500)
        
        //Check the website
        cy.url().should('be.equal', 'https://register.rediff.com/register/register.php')
    })
})