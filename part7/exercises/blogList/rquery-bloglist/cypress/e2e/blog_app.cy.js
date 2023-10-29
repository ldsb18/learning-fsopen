const GLOBAL_WAIT_TIME = 500

describe('Blog app', function() {
	
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		const user = {
			name: 'Cypress Testing CLI',
			username: 'cypressTesting',
			password: 'cypressTesting'
		}

		const anotherUser = {
			name: 'Cypress Testing CLI2',
			username: 'cypressTesting2',
			password: 'cypressTesting2'
		}

		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.request('POST', 'http://localhost:3003/api/users', anotherUser)

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
					cy.createBlog({ title: 'Test blog 1', author: 'Cypress CLI', url: 'testing.com' })
					cy.createBlog({ title: 'Test blog 2 to be deleted', author: 'Cypress CLI - delete', url: 'delete.com' })
					cy.createBlog({ title: 'Test blog 3', author: 'Cypress CLI', url: 'anothertest.com' })
					cy.contains('logout').click()
					cy.login({ username: 'cypressTesting2', password: 'cypressTesting2' })
					cy.createBlog({ title: 'Test blog 4 from another user', author: 'Cypress CLI2', url: 'anotheruser.com' })
					cy.contains('logout').click()
					cy.login({ username: 'cypressTesting', password: 'cypressTesting' })
				})

				it('A blog can be liked', function() {
					cy.contains('View').click()
					cy.contains('Likes: 0')
					cy.contains('Like').click()
					cy.contains('Likes: 1')
				})

				it('A blog can be deleted by the creator user', function() {
					cy.contains('Test blog 2 to be deleted').find('button').click()
					cy.contains('Test blog 2 to be deleted').parent().contains('DELETE').click()
					
					cy.get('.blogs').should('not.contain', 'Test blog 2 to be deleted')
						.and('not.contain', 'Cypress CLI - delete')
						.and('not.contain', 'delete.com')

				})

				it('A blog can not be deleted by another user', function() {
					cy.contains('Test blog 4 from another user').find('button').click()
					cy.contains('Test blog 4 from another user').parent().contains('DELETE').click()
					
					cy.get('.notification').should('contain', 'user do not have permission to delete this blog')
						.and('have.css', 'color', 'rgb(255, 0, 0)')
						.and('have.css', 'border-style', 'solid')

					cy.get('.blogs').should('contain', 'Test blog 4 from another user')
				})

				it('blogs are ordered by amount of likes', function() {
					
					cy.contains('Test blog 1').find('button').click()
					cy.contains('Title: Test blog').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					//1 like to blog 1

					cy.contains('Test blog 2 to be deleted').find('button').click()
					cy.contains('Test blog 2 to be deleted').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					cy.contains('Test blog 2 to be deleted').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					//2 like to blog 2

					cy.contains('Test blog 3').find('button').click()
					cy.contains('Test blog 3').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					cy.contains('Test blog 3').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					cy.contains('Test blog 3').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					//3 like to blog 3

					cy.contains('Test blog 4 from another user').find('button').click()
					cy.contains('Test blog 4 from another user').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					cy.contains('Test blog 4 from another user').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					cy.contains('Test blog 4 from another user').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					cy.contains('Test blog 4 from another user').parent().find('.likeButton').click()
					cy.wait(GLOBAL_WAIT_TIME)
					//4 like to blog 4

					cy.get('.blogs').eq(0).should('contain', 'Title: Test blog 4 from another user - by Cypress CLI2')
						.and('contain', 'Likes: 4')

					cy.get('.blogs').eq(1).should('contain', 'Test blog 3')
						.and('contain', 'Likes: 3')

					cy.get('.blogs').eq(2).should('contain', 'Test blog 2 to be deleted')
						.and('contain', 'Likes: 2')

					cy.get('.blogs').eq(3).should('contain', 'Test blog 1')
						.and('contain', 'Likes: 1')

				})
			})
		})
	})
})