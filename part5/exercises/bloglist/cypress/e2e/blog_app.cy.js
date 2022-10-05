describe('Blog app', function() {
	
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		const user = {
			name: 'Cypress Testing CLI',
			username: 'cypressTesting',
			password: 'cypressTesting'
		}

		cy.request('POST', 'http://localhost:3003/api/users', user)

		cy.visit('http://localhost:3000/')
	})

	it('Login form is shown', function() {
		cy.contains('Log-in to application')

		cy.contains('username')
		cy.contains('password')
		cy.contains('Login')
	})

	describe('Login', function() {

		it('succeds with correct credentials', function() {
			cy.get('#username').type('cypressTesting')
			cy.get('#password').type('cypressTesting')
			cy.get('#loginButton').click()

			cy.contains('Username "cypressTesting" logged successfully')
			cy.contains('Blogs')
			cy.contains('New Blog')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('wrong')
			cy.get('#password').type('wrong')
			cy.get('#loginButton').click()

			cy.get('.notification').should('contain', 'invalid username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.contains('Log-in to application')

			cy.contains('username')
			cy.contains('password')
			cy.contains('Login')
		})

		describe('When logged in', function() {
			beforeEach(function() {
				cy.login({ username: 'cypressTesting', password: 'cypressTesting' })
			})

			it('A blog can be created', function() {
				cy.contains('New Blog').click()

				cy.get('#title').type('Test blog')
				cy.get('#author').type('Cypress CLI')
				cy.get('#url').type('testing.com')
				cy.get('.submitButton').click()

				cy.contains('Test blog - Cypress CLI')
				cy.contains('View')
			})

			describe('When there are some blogs', function() {

				beforeEach(function() {
					cy.createBlog({title: 'Test blog', author: 'Cypress CLI', url: 'testing.com'})
				})

				it('A blog can be liked', function() {
					cy.contains('View').click()
					cy.contains('Likes: 0')
					cy.contains('Like').click()
					cy.contains('Likes: 1')
				})
			})
		})
	})
})