/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false for at forhindre testfejl
    return false;
  });

describe('Uploading and downloading', function() {
    it('Scenario 1 - Uploading', function() {
        //Visit the website
        cy.visit('https://demoqa.com/upload-download')

        //Upload the file
        cy.get('input[id="uploadFile"]').attachFile('example.json')

        //Assert the uploaded file
        cy.get('p[id="uploadedFilePath"]').should('contain', 'example.json')
    })

    it('Scenario 2 - Downloading', function() {
        //Visit the website
        cy.visit('https://demoqa.com/upload-download')

        //Clikcs on the download button
        cy.get('a[id="downloadButton"]').should('have.attr', 'href').then((href) => {

            //Checks the content
            cy.request({
                url: href,
                encoding: "binary"
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.length).to.be.greaterThan(1000);
            })
        })
    })
})