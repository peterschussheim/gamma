/// <reference types="Cypress" />

xdescribe('Signup', function() {
  beforeEach(() => {
    cy.visit('/auth/login')
  })
  it('Allows new users to signup', function() {
    cy.get('a > button').click()
    // enter email
    // enter pw
    // click login
  })
})
