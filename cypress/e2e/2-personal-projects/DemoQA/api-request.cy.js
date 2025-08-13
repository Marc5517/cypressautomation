/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
});

// test suite name
describe('API-interception and validate', function() {
    it('Scenario 1 - Validate list of books', function() {
        //Get request to the bookstore website
        cy.request('GET', 'https://demoqa.com/BookStore/v1/Books').then(function(response) {
            //Asserting status
            expect(response.status).to.eq(200)

            //Asserting there's more than 0 books
            expect(response.body.books).to.have.length.greaterThan(0)

            //Assert that there are 8 books
            expect(response.body.books).to.have.length(8)

            //Asserting that every books has a title, author and ISBN
            response.body.books.forEach(function(book) {
                expect(book).to.have.property('title').and.be.a('string')
                expect(book).to.have.property('author').and.be.a('string')
                expect(book).to.have.property('isbn').and.be.a('string')
                expect(book).to.have.property('publisher').and.be.a('string')
            })

            //Assert that every ISBN are unique
            const isbns = response.body.books.map(b => b.isbn)
            const uniqueIsbns = new Set(isbns)
            expect(uniqueIsbns.size).to.eq(isbns.length)

            //Assert that one book has "O'Reilly Media" as it's publisher
            const hasOreilly = response.body.books.some(b => b.publisher === "O'Reilly Media")
            expect(hasOreilly).to.be.true

            //Assert that one book has the title "Git Pocket Guide"
            const hasGitPocketGuide = response.body.books.some(b => b.title === "Git Pocket Guide")
            expect(hasGitPocketGuide).to.be.true
        })
    })
    it('Scenario 2 - validate a single book', function() {
        //Get a book by ISBN
        cy.request('GET', 'https://demoqa.com/BookStore/v1/Book?ISBN=9781449325862').then(function(response) {
            //Assert the title is correct
            expect(response.body.title).to.eq('Git Pocket Guide')
        })
    })

    it('Scenario 3 - registrate a new user, login, validate and delete', function() {
        const randomId = Math.floor(Math.random() * 100000)
        const userName = `testBruger${randomId}`
        const password = 'Test123!'
        
        //Step 1: Registrate a new account
        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/User',
            body: {
                userName,
                password
            },
        }).then(function(res) {
            expect(res.status).to.eq(201)
            expect(res.body.username).to.eq(userName)
            expect(res.body.userID).to.be.a('string').and.not.be.null

            //Saving userID
            const userId = res.body.userID

            //Step 2: Validate new user
            cy.request({
                method: 'POST',
                url: 'https://demoqa.com/Account/v1/Authorized',
                body: {
                    userName,
                    password
                }
            }).then((authRes) => {
                expect(authRes.status).to.eq(200)

                //Step 3: Login
                cy.request({
                    method: 'POST',
                    url: 'https://demoqa.com/Account/v1/GenerateToken',
                    body: {
                        userName,
                        password
                    }
                }).then(function(loginRes) {
                    expect(loginRes.status).to.eq(200)
                    expect(loginRes.body.status).to.eq("Success")
                    expect(loginRes.body.token).to.be.a('string').and.not.be.empty

                    //Saving the token
                    //cy.wrap(loginRes.body.token).as('authToken')
                    const authToken = loginRes.body.token

                    //Step 4: Look at user data with authorization
                    cy.request({
                        method: 'GET',
                        url: `https://demoqa.com/Account/v1/User/${userId}`,
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    }).then(function(userRes) {
                        expect(userRes.status).to.eq(200)
                        expect(userRes.body.username).to.eq(userName)

                        //Step 5: Delete the user
                        cy.request({
                            method: 'DELETE',
                            url: `https://demoqa.com/Account/v1/User/${userId}`,
                            headers: {
                                Authorization: `Bearer ${authToken}`
                            }
                        }).then(function(delRes) {
                            expect(delRes.status).to.eq(204)

                            //Step 6: Affirm it's deleted
                            cy.request({
                                method: 'GET',
                                url: `https://demoqa.com/Account/v1/User/${userId}`,
                                headers: {
                                    Authorization: `Bearer ${authToken}`
                                },
                                failOnStatusCode: false
                            }).then(function(finalRes) {
                                expect([401, 404]).to.include(finalRes.status)
                            })
                        })
                    })
                })
            })
        })
    })
})