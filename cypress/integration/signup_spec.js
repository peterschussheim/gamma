/// <reference types="Cypress" />

xdescribe('Signup', function() {
  it('Allows new users to signup', function() {
    cy.visit('http://localhost:3000')
    cy.wait(250)
    cy.get('a > button')
    // enter email
    // enter pw
    // click login
  })
})
