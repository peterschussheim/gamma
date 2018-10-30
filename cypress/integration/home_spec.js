/// <reference types="Cypress" />

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Visits local gamma homepage', () => {
    cy.get('[data-cy="authenticate-link"]').should('be.visible')
    cy.get('[data-cy="counter-sub"]').should('be.visible')
  })
})
