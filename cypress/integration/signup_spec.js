/// <reference types="Cypress" />

describe('Signup', function() {
  beforeEach(() => {
    cy.visit('/auth/login')
    cy.get('[data-cy="signup-button"]').click()
    cy.get('[data-cy="authenticate-link"]').should('not.exist')
  })
  xit('Allows new users to signup', function() {
    cy.get('[data-cy="name-input"]')
      .type('Peter')
      .should('have.value', 'Peter')
    cy.get('[data-cy="email-input"]')
      .type('peter@schussheim.com')
      .should('have.value', 'peter@schussheim.com')
    cy.get('[data-cy="password-input"]')
      .type('12345')
      .should('have.value', '12345')
    cy.get('[data-cy="signup-button"]').click()
    // automatically update user 'emailConfirmed=true'
  })
  it('Enforces unique email constraint by rendering error', function() {
    cy.get('[data-cy="name-input"]')
      .type('Peter')
      .should('have.value', 'Peter')
    cy.get('[data-cy="email-input"]')
      .type('peter@schussheim.com')
      .should('have.value', 'peter@schussheim.com')
    cy.get('[data-cy="password-input"]')
      .type('12345')
      .should('have.value', '12345')
    cy.get('[data-cy="signup-button"]').click()
    cy.get('[data-cy="form-error"]').should('exist')
    // automatically update user 'emailConfirmed=true'
  })
})
