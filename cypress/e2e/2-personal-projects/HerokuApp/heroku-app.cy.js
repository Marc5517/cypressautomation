/// <reference types="cypress" />

const username = "tomsmith"
const password = "SuperSecretPassword!"
const fUsername = "momsmith"
const fPassword = "SuperSecretPassword"

describe("herokuapp", function() {
    it("Scenario 1 - Login - success", function() {
        cy.visit("https://the-internet.herokuapp.com/login")

        //Enter username and password
        cy.get('input[id="username"]').type(username).should("have.value", username)
        cy.get('input[id="password"]').type(password).should("have.value", password)

        //Login
        cy.get('button[type="submit"]').click()

        //Assert it's the right site
        cy.url().should("eq", "https://the-internet.herokuapp.com/secure")
        cy.contains("Welcome to the Secure Area. When you are done click logout below.").should("exist")
        cy.get("a.button").should("contain", "Logout")
    })

    it("Scenario 2 - Fail", function() {
        cy.visit("https://the-internet.herokuapp.com/login")

        //Enter wrong username and password
        cy.get('input[id="username"]').type(fUsername).should("have.value", fUsername)
        cy.get('input[id="password"]').type(fPassword).should("have.value", fPassword)

        //Login fail
        cy.get('button[type="submit"]').click()

        //Assert it's not a new site
        cy.contains("Your username is invalid").should("exist")
        cy.url().should("eq", "https://the-internet.herokuapp.com/login")
        cy.url().should("not.eq", "https://the-internet.herokuapp.com/secure")
    })

    it("Scenario 3 - Fail with empty rows", function() {
        cy.visit("https://the-internet.herokuapp.com/login")

        //Login
        cy.get('button[type="submit"]').click()

        //Assert it's not a new site
        cy.contains("Your username is invalid").should("exist")
        cy.url().should("eq", "https://the-internet.herokuapp.com/login")
        cy.url().should("not.eq", "https://the-internet.herokuapp.com/secure")
    })

    it("Scenario 4 - Dropdown", function () {
        cy.visit("https://the-internet.herokuapp.com/login")

        //Enter username and password
        cy.get('input[id="username"]').type(username).should("have.value", username)
        cy.get('input[id="password"]').type(password).should("have.value", password)

        //Visit the dropdown page
        cy.visit('https://the-internet.herokuapp.com/dropdown')

        //Assert there's no value
        cy.get('select[id="dropdown"] option:selected').should('have.text', 'Please select an option')

        //Choose option 1 and check value
        cy.get('select[id="dropdown"]').select('Option 1').should('have.value', '1').wait(2500)

        //Choose option 2 and check value
        cy.get('select[id="dropdown"]').select('Option 2').should('have.value', '2')

    })
})