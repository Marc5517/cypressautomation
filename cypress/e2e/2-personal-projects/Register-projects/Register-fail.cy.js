/// <reference types="cypress" />

// test suite name
describe('Test with register rediff', function() {
    //saved examples
    const name = 'Marc Steen Fordsmand'
    const rediffemail = 'MSF'
    const password = 's0mepassw0rd'
    const password2 = 'N0passw0rd'
    const day = 19
    const month = 10
    const year = '1998'
    const mail = 'some@mail.com'
    const number = 23456789
     
    beforeEach(() => {
        // test step for URL
        cy.visit("https://register.rediff.com/register/register.php")
    })

    it('Scenario 1 - fail without filling out anything', function () {
        cy.get('input[id="Register"]').click()
        cy.contains('Your full name cannot be blank. Enter firstname and lastname (e.g., Om Patil)').should('exist')
    })

    it('Scenario 2 - fail without email id', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        cy.get('input[id="Register"]').click()
        cy.contains('ID cannot be blank, please enter your desired ID').should('exist')
    })

    it('Scenario 3 - fail without password', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('The password field is empty. Please enter password.').should('exist')
    })

    it('Scenario 3a - fail with only 1 password', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert password one time
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Passwords typed do not match, please re-enter your passwords.').should('exist')
    })

    it('Scenario 3b - fail with 2 different passwords', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password2).should('have.value', password2)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Passwords typed do not match, please re-enter your passwords.').should('exist')
    })

    it('Scenario 4 - fail with no date', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Please select date of birth').should('exist')
    })

    it('Scenario 4a - fail with only date', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        //Select the day
        cy.get('select[class="day"]').select(day).should('have.value', day)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Please select month of birth').should('exist')
    })

    it('Scenario 4b - fail with only month', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        //Select the month
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Please select date of birth').should('exist')
    })

    it('Scenario 4c - fail with only year', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        //Select the year
        cy.get('select[class="year"]').select(year).should('have.value', year)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Please select date of birth').should('exist')
    })

    it('Scenario 4d - fail with only date and month', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        //Select the day and month
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Please select year of birth').should('exist')
    })

    it('Scenario 5 - fail with no selected city', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        //Select the date of birth
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        cy.get('select[class="year"]').select(year).should('have.value', year)
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Please select city').should('exist')
    })

    it('Scenario 6 - fail with no e-mail', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        //Select the date of birth
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        cy.get('select[class="year"]').select(year).should('have.value', year)
        //Select city
        cy.get('select[onchange="showothcity();fieldTrack(this);"]').select('Agra').should('have.value', 'Agra')
        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('The alternate email ID cannot be blank').should('exist')
    })

    it('Scenario 7 - fail with no phone number', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        
        //Select the date of birth
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        cy.get('select[class="year"]').select(year).should('have.value', year)
        
        //Select city
        cy.get('select[onchange="showothcity();fieldTrack(this);"]').select('Agra').should('have.value', 'Agra')
        
        //Insert email
        cy.get('input[placeholder="Enter recovery email"]').type(mail).should('have.value', mail)

        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Please enter a valid mobile number').should('exist')
    })

    it('Scenario 8 - fail with no captcha', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        
        //Select the date of birth
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        cy.get('select[class="year"]').select(year).should('have.value', year)
        
        //Select city
        cy.get('select[onchange="showothcity();fieldTrack(this);"]').select('Agra').should('have.value', 'Agra')
        
        //Insert email
        cy.get('input[placeholder="Enter recovery email"]').type(mail).should('have.value', mail)

        //Enter phone number
        cy.get('input[id="mobno"]').type(number).should('have.value', number)

        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Captcha code field cannot be blank').should('exist')
    })

    it('Scenario 9 - fail with everything being filled out, except the full name', function () {
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        
        //Select the date of birth
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        cy.get('select[class="year"]').select(year).should('have.value', year)
        
        //Select city
        cy.get('select[onchange="showothcity();fieldTrack(this);"]').select('Agra').should('have.value', 'Agra')
        
        //Insert email
        cy.get('input[placeholder="Enter recovery email"]').type(mail).should('have.value', mail)

        //Enter phone number
        cy.get('input[id="mobno"]').type(number).should('have.value', number)

        //Enter captcha (though it will fail, since it changes every time)
        cy.get('input[placeholder="Enter Captcha"]').type('CDYY').should('have.value', 'CDYY')

        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Your full name cannot be blank. Enter firstname and lastname (e.g., Om Patil)').should('exist')
    })

    it('Scenario 10 - fail without giving a security question', function () {
        //Insert full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
        
        //Select the date of birth
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        cy.get('select[class="year"]').select(year).should('have.value', year)
        
        //Select city
        cy.get('select[onchange="showothcity();fieldTrack(this);"]').select('Agra').should('have.value', 'Agra')

        //Click on checkbox
        cy.get('input[type="checkbox"]').check().should('be.checked')

        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('Please select the hint question.').should('exist')
    })

    it('Scenario 11 - fail without giving an answer', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
         
        //Select the date of birth
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        cy.get('select[class="year"]').select(year).should('have.value', year)
        
        //Select city
        cy.get('select[onchange="showothcity();fieldTrack(this);"]').select('Agra').should('have.value', 'Agra')

        //Click on checkbox
        cy.get('input[type="checkbox"]').check().should('be.checked')

        //Select a Security question
        cy.contains('Select a Security Question').parent().find('select').select('What is your favourite food?')

        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains('The hint answer field is empty.').should('exist')
    })

    it('Scenario 12 - fail without filling out maiden name', function () {
        //Insert Full name
        cy.get('input[placeholder="Enter your full name"]').type(name).should('have.value', name)
        
        //Insert Mail ID
        cy.get('input[placeholder="Enter Rediffmail ID"]').type(rediffemail).should('have.value', rediffemail)
        
        //Insert 1st password 
        cy.get('input[placeholder="Enter password"]').type(password).should('have.value', password)
        
        //Insert 2nd password
        cy.get('input[placeholder="Retype password"]').type(password).should('have.value', password)
         
        //Select the date of birth
        cy.get('select[class="day"]').select(day).should('have.value', day)
        cy.get('select[class="middle month"]').select(month).should('have.value', month)
        cy.get('select[class="year"]').select(year).should('have.value', year)
        
        //Select city
        cy.get('select[onchange="showothcity();fieldTrack(this);"]').select('Agra').should('have.value', 'Agra')

        //Click on checkbox
        cy.get('input[type="checkbox"]').check().should('be.checked')

        //Select a Security question
        cy.contains('Select a Security Question').parent().find('select').select('What is your favourite food?')

        //Enter answer
        cy.contains('Enter an Answer').parent().find('input').type('Carbonara')

        //Click on create
        cy.get('input[id="Register"]').click()
        cy.contains("Please enter your mother's maiden name.").should('exist')
    })
})