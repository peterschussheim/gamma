/// <reference types="Cypress" />

describe('Logout', () => {
  beforeEach(() => {
    cy.visit('/auth/login')
    cy.get('[data-cy="authenticate-link"]').should('not.exist')
  })
  it('Clears an authenticated user session', () => {
    cy.get('[data-cy="email-input"]')
      .type('peter@schussheim.com')
      .should('have.value', 'peter@schussheim.com')
    cy.get('[data-cy="password-input"]')
      .type('12345')
      .should('have.value', '12345')
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="authenticate-link"]').should('not.exist')
    cy.get('[data-cy="logout-button"]').should('be.visible')
    cy.get('[data-cy="logout-button"]').click()
    cy.get('[data-cy="authenticate-link"]').should('be.visible')
    cy.get('[data-cy="logout-button"]').should('not.exist')
  })
})
