import user from "../fixtures/user.json";

describe("GitFinder — Complete User Journey", () => {
  describe("Happy Path", () => {
    it("searches for a user → opens profile → opens repository → returns to profile → returns to search", () => {
      cy.mockGitHubApi();

      // 1. Search
      cy.visit("/");
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");
      cy.get("article").should("have.length", 2);

      // 2. User Profile
      cy.contains(user.login).closest("article").click();
      cy.wait("@getUser");
      cy.wait("@getUserRepos");
      cy.url().should("include", `/user/${user.login}`);
      cy.contains("Linus Torvalds").should("be.visible");
      cy.get("tbody tr").should("have.length", 3);

      // 3. Repository
      cy.get("tbody tr").contains(user.repo).click();
      cy.wait("@getRepo");
      cy.url().should("include", `/user/${user.login}/repo/${user.repo}`);
      cy.contains("Linux kernel source tree").should("be.visible");

      // 4. Back to Profile
      cy.contains("Voltar").click();
      cy.url().should("include", `/user/${user.login}`);

      // 5. Back to Search
      cy.contains("Voltar").click();
      cy.url().should("include", `?q=${user.login}`);
    });
  });
});