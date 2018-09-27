/// <reference types="Cypress" />

describe('Local smoketest', function() {
  it('Visits local gamma homepage', function() {
    cy.visit('http://localhost:3000')
  })
})
