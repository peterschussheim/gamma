/// <reference types="Cypress" />

xdescribe('Logout', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it(`Clears an authenticated users' session`, () => {
    cy.get('p > a').click()
    cy.get('#email-input')
      .type('peter@schussheim.com')
      .should('have.value', 'peter@schussheim.com')
    cy.get('[placeholder="Password..."]')
      .type('12345')
      .should('have.value', '12345')
    cy.get('[data-cy="login-button"]').click()
    // TODO: update components to use 'data-cy=xxx' tags then update below
    cy.get('nav > :nth-child(1) > :nth-child(3)').should('be.visible')
    cy.get('nav > :nth-child(1) > :nth-child(4)').should('be.visible')
    cy.get('nav > :nth-child(1) > :nth-child(6)').should('be.visible')
  })
})
