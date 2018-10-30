/// <reference types="Cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/auth/login')
    cy.get('[data-cy="authenticate-link"]').should('not.exist')
  })
  it('Authenticates an existing user', () => {
    cy.get('[data-cy="email-input"]')
      .type('peter@schussheim.com')
      .should('have.value', 'peter@schussheim.com')
    cy.get('[data-cy="password-input"]')
      .type('12345')
      .should('have.value', '12345')
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="authenticate-link"]').should('not.exist')
    cy.get('[data-cy="counter-sub"]').should('be.visible')
    cy.get('[data-cy="logout-button"]').should('be.visible')
  })
  it('Renders error for non-existant email', () => {
    cy.get('[data-cy="email-input"]')
      .type('auntbee@mayberry.gov')
      .should('have.value', 'auntbee@mayberry.gov')
    cy.get('[data-cy="password-input"]')
      .type('12345')
      .should('have.value', '12345')
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="form-error"]').should('exist')
  })
})
