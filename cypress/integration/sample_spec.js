/// <reference types="Cypress" />

describe('Basic', function() {
  it('Visits local gamma homepage', function() {
    cy.visit('http://localhost:3000')
  })
  it('Visits deployed gamma homepage', function() {
    cy.visit('https://gamma.app')
  })
})
