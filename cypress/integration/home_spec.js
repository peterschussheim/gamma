/// <reference types="Cypress" />

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Visits local gamma homepage', () => {
    cy.get(':nth-child(3) > span')
    cy.get('p > a').should('be.visible')
    // websocket counter should be visible
  })
})
