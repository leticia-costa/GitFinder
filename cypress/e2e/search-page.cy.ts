import user from "../fixtures/user.json";

describe("GiFinder — Página de busca", () => {
  // ─── SearchPage ───────────────────────────────────────────────────

  describe("SearchPage", () => {
    beforeEach(() => {
      cy.mockGitHubApi();
      cy.visit("/");
    });

    it("exibe o estado inicial vazio corretamente", () => {
      cy.contains("Busque um usuário do GitHub").should("be.visible");
      cy.get('input[placeholder*="Buscar"]')
        .should("be.visible")
        .and("be.focused");
    });

    it("exibe resultados após busca", () => {
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");

      cy.get("article").should("have.length", 2);
      cy.contains(user.login).should("be.visible");
    });

    it("exibe o total de resultados encontrados", () => {
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");

      cy.contains("2").should("be.visible");
      cy.contains("usuários encontrados").should("be.visible");
    });

    it('exibe estado "não encontrado" para busca sem resultado', () => {
      cy.intercept("GET", "**/search/users**", {
        body: { total_count: 0, incomplete_results: false, items: [] },
      }).as("emptySearch");

      cy.get('input[placeholder*="Buscar"]').type("xyzxyz123");
      cy.wait("@emptySearch");

      cy.contains("Nenhum usuário encontrado").should("be.visible");
    });

    it("exibe estado de erro quando a API falha", () => {
      cy.intercept("GET", "**/search/users**", { statusCode: 500 }).as(
        "errorSearch",
      );

      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@errorSearch");

      cy.contains("Algo deu errado").should("be.visible");
    });

    it("limpa a busca ao clicar no botão X", () => {
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");

      cy.get('[aria-label="Limpar busca"]').click();

      cy.get('input[placeholder*="Buscar"]').should("have.value", "");
      cy.contains("Busque um usuário do GitHub").should("be.visible");
    });
  });

  // ─── Navegação Search → User ──────────────────────────────────────

  describe("Navegação Search → UserPage", () => {
    beforeEach(() => {
      cy.mockGitHubApi();
      cy.visit("/");
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");
    });

    it("navega para a página do usuário ao clicar no card", () => {
      cy.contains(user.login).closest("article").click();

      cy.url().should("include", `/user/${user.login}`);
      cy.wait("@getUser");
    });
  });
});
