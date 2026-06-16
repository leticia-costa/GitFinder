import user from "../fixtures/user.json";

describe("GitFInder — Fluxo completo", () => {
  // ─── Fluxo completo E2E ───────────────────────────────────────────

  describe("Fluxo completo", () => {
    it("busca → perfil → repositório → volta ao perfil → volta à busca", () => {
      cy.mockGitHubApi();

      // 1. Busca
      cy.visit("/");
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");
      cy.get("article").should("have.length", 2);

      // 2. Perfil
      cy.contains(user.login).closest("article").click();
      cy.wait("@getUser");
      cy.wait("@getUserRepos");
      cy.url().should("include", `/user/${user.login}`);
      cy.contains("Linus Torvalds").should("be.visible");
      cy.get("tbody tr").should("have.length", 3);

      // 3. Repositório
      cy.get("tbody tr").contains(user.repo).click();
      cy.wait("@getRepo");
      cy.url().should("include", `/user/${user.login}/repo/${user.repo}`);
      cy.contains("Linux kernel source tree").should("be.visible");

      // 4. Volta ao perfil
      cy.contains("Voltar").click();
      cy.url().should("include", `/user/${user.login}`);

      // 5. Volta à busca
      cy.contains("Voltar").click();
      cy.url().should("include", `?q=${user.login}`);
    });
  });
});
