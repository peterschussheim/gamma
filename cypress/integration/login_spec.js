/// <reference types="Cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Authenticates an existing user', () => {
    cy.get('p > a').click()
    cy.get('#email-input')
      .type('peter@schussheim.com')
      .should('have.value', 'peter@schussheim.com')
    cy.get('[placeholder="Password..."]')
      .type('12345')
      .should('have.value', '12345')
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="authenticate-link"]').should('be.visible')
    cy.get('[data-cy="counter-sub"]').should('be.visible')
    cy.get('[data-cy="logout-button"]').should('be.visible')
  })
  it('Validates form data on the client', () => {})
})
