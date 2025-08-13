/// <reference types="cypress" />

describe('JavaScripts Alarts', function() {
    
    beforeEach(() => {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts")
    })

    it('Scenario 1 - JS Alert', function() {
        //Click on the button
        cy.get('button[onclick="jsAlert()"]').click()

        //Verify text on pop-up
        cy.on('window:alert', function(t) {
            expect(t).to.contains('I am a JS Alert')
        })

        //Assert the text is there
        cy.get('p[id="result"]').should('have.text', 'You successfully clicked an alert')
    })

    it('Scenario 2a - JS Confirm', function() {
        //Click on the button
        cy.get('button[onclick="jsConfirm()"]').click()

        //Verify text on pop-up
        cy.on('window:confirm', function(t) {
            expect(t).to.contains('I am a JS Confirm')
        })

        //Assert the text is there
        cy.get('p[id="result"]').should('have.text', 'You clicked: Ok')
    })

    it('Scenario 2b - JS Confirm', function() {
        //Click on the button
        cy.get('button[onclick="jsConfirm()"]').click()

        //Fire confirm browser event
        cy.on('window:confirm', function() {
            return true
        })

        //Assert the text is there
        cy.get('p[id="result"]').should('have.text', 'You clicked: Ok')
    })

    it('Scenario 3 - JS Cancel', function() {
        //Click on the button
        cy.get('button[onclick="jsConfirm()"]').click()

        //Fire confirm browser event
        cy.on('window:confirm', function() {
            return false
        })

        //Assert the text is there
        cy.get('p[id="result"]').should('have.text', 'You clicked: Cancel')
    })

    it('Scenario 4 - JS prompt text', function() {
        //Handling prompt alert
        cy.window().then(function(p){
            //Stubbing prompt window
            cy.stub(p, 'prompt').returns('Marc was here!')
            
            //Click on the button
            cy.get('button[onclick="jsPrompt()"]').click()
            
            //Verify text on pop-up
            cy.on('window:confirm', function(t) {
                expect(t).to.contains('I am a JS Prompt')
            })

            //Assert the text is there
            cy.get('p[id="result"]').should('have.text', 'You entered: Marc was here!')
        })
    })

    it('Bonus scenario - JS prompt cancel', function() {
        //Handling prompt alert
        cy.window().then(function(p){
            //Stubbing prompt window
            cy.stub(p, 'prompt').returns(null)
            
            //Click on the button
            cy.get('button[onclick="jsPrompt()"]').click()

            //Verify text on pop-up
            cy.on('window:confirm', function(t) {
                expect(t).to.contains('I am a JS Prompt')
            })

            //Assert the text isn't there
            cy.get('p[id="result"]').should('have.text', 'You entered: null')
        })
    })
})