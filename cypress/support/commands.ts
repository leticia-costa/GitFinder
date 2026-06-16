/// <reference types="cypress" />

Cypress.Commands.add('mockGitHubApi', () => {
  cy.intercept('GET', '**/search/users**', { fixture: 'search-users.json' }).as('searchUsers')
  cy.intercept('GET', '**/users/torvalds/repos**', { fixture: 'user-repos.json' }).as('getUserRepos')
  cy.intercept('GET', '**/users/torvalds', { fixture: 'user-profile.json' }).as('getUser')
  cy.intercept('GET', '**/repos/torvalds/linux', { fixture: 'repository.json' }).as('getRepo')
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mockGitHubApi(): Chainable<void>
    }
  }
}
export {}