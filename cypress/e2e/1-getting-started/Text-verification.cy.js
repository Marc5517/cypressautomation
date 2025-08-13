/// <reference types="cypress" />

// test suite name
describe('Test with text verification', function () {
  // Test case
     it('Scenario 1', function (){
        // test step for URL launching
        cy.visit("https://accounts.google.com")
        // identify element
        cy.get('h1#headingText').find('span').should('have.text','Sign in')
        // identify element subext
        cy.get('div#headingSubtext').find('span').should('have.text','Use your Google Account')
        // identify that element doesn't exist
        cy.get('div#headingSubtext').find('span').should('not.have.text', 'Use your non-Google Account')
        // identify element and put in Console
        cy.get('div#headingSubtext').find('span').then(function(e){
          const t = e.text()
          // get in Console
          console.log(t)
       })
       // Console message
        console.log("Tutorialspoint-Cypress")
      })

      it('Scenario 2', function () {
        // test step for URL launching
        cy.visit("https://accounts.google.com")
        // identify text
        cy.contains("sign").should('exist');
        cy.contains("your Google").should('exist');
        // identify that text doesn't exist
        cy.contains('Marc').should('not.exist');
        // identify text and put in Console
        cy.contains("Account").should('exist').then(function(e){
         const t = e.text()
         // get in Console
         console.log(t)
        })
      })
  })
