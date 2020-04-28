describe('Blog app', function () {

    const testUser = {

        name: "Testman",
        userName: "Testman2020",
        password: "Testingisfun"

    }

    beforeEach(function () {

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

    describe('Login', function () {

        it('succeeds with correct credientials', function () {

            cy.get('#username').type(testUser.userName)
            cy.get('#password').type(testUser.password)
            cy.get('#loginbutton').click()

            cy.contains('Login succesful')

        })


        it('fails with false credientials', function () {

            cy.get('#username').type('hips')
            cy.get('#password').type('hups')
            cy.get('#loginbutton').click()

            cy.contains('Login failed')

        })


    })

    describe('When logged in', function () {

        beforeEach(function () {
            cy.login(testUser)
        })

        it('a blog can be created', function () {

            cy.contains('Add blog').click()

            cy.get('#title').type('A test blog')
            cy.get('#author').type('Some software person')
            cy.get('#url').type('www.testblog.com')

            cy.get('#addbutton').click()
            
            cy.get('#bloglist').contains('A test blog')
            cy.get('#bloglist').contains('Some software person')

        })

        it('a blog can be liked', function () {

            cy.addblog({title: 'A test blog', author: 'Some software person', url: 'www.testblog.com'})
           
            cy.get('#expandbutton').click()
            cy.contains(0)
            cy.get('#likebutton').click()
            cy.contains(1)

        })

        it('a blog can be deleted', function () {

            cy.addblog({title: 'A test blog', author: 'Some software person', url: 'www.testblog.com'})
           
            cy.get('#expandbutton').click()
            cy.contains('Delete').click()
            cy.contains('Blog A test blog deleted succesfully')

            cy.contains('A test blog').not()
        })


    })

})