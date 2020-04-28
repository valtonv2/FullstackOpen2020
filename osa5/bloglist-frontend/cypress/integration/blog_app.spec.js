describe('Blog app', function () {

    beforeEach(function () {

        const testUser = {

            name: "Testman",
            userName: "Testman2020",
            password: "Testingisfun"

        }

        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', testUser)
        cy.visit('http://localhost:3000')

    })

    it('Login form is shown', function () {

        cy.get('.loginform').contains('Login')
        cy.get('#username')
        cy.get('#password')
        cy.get('#loginbutton')
        cy.contains('Username')
        cy.contains('Password')
        

    })

})