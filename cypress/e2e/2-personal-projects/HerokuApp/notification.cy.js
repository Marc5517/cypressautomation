/// <reference types="cypress" />

describe('Validate notifications and timing', function() {
    const validMessages = [
        'Action successful',
        'Action unsuccesful, please try again',
        'Action unsuccessful'
    ]

    const messages = new Set()

    beforeEach('visit the website', function() {
        cy.visit('https://the-internet.herokuapp.com/notification_message_rendered')
    })
    it('Scenario 1', function() {
        function clickAndCollect(i = 0) {
            if(i >= 10) {
                //Asserting that there are at least two unique messages
                expect(messages.size).to.be.greaterThan(1)
                return
            }

            //Click on the button
            cy.get('a[href="/notification_message"]').click()

            //Assert that the notification is there
            cy.get('div[id="flash"]').should('exist')

            cy.get('div[id="flash"]').invoke('text').then(text => {
                console.log('The text was: ', text)
                const cleaned = text.trim().replace('×', '').trim()
                expect(validMessages).to.include(cleaned)

                messages.add(cleaned)

                clickAndCollect(i + 1)
            })
        }
        clickAndCollect()
    })

    it('Scenario 2', function() {
        function tryUntilSuccess(attempt = 1) {
            //Click on the button
            cy.get('a[href="/notification_message"]').click()

            //Assert that the notification is there
            cy.get('div[id="flash"]').should('exist')

            cy.get('div[id="flash"]').invoke('text').then(text => {
                console.log('The text was: ', text)
                const cleaned = text.trim().replace('×', '').trim()
                expect(validMessages).to.include(cleaned)

                //Asserts the text is "Action successful" and if not, then it continues
                if(cleaned === 'Action successful') {
                    cy.log(`Successful after ${attempt} attempts!`)
                    expect(cleaned).to.eq('Action successful')
                } else if (attempt < 10) {
                    tryUntilSuccess(attempt + 1)
                } else {
                    throw new Error('Action successful was not achieved after 10 attempts')
                }
            })
        }
        tryUntilSuccess()
    })
})