import user from "../fixtures/user.json";

describe("GitFinder — Página de repositório", () => {
  // ─── RepositoryPage ───────────────────────────────────────────────

  describe("RepositoryPage", () => {
    beforeEach(() => {
      cy.mockGitHubApi();
      cy.visit(`/user/${user.login}/repo/${user.repo}`);
      cy.wait("@getRepo");
    });

    it("exibe o breadcrumb com owner e nome do repo", () => {
      cy.contains("button", user.login).should("be.visible");
      cy.contains(user.repo).should("be.visible");
    });

    it("exibe os StatBadges com valores corretos", () => {
      cy.contains("180.000").should("be.visible");
      cy.contains("stars").should("be.visible");
      cy.contains("55.000").should("be.visible");
      cy.contains("forks").should("be.visible");
      cy.contains("312").should("be.visible");
      cy.contains("issues abertas").should("be.visible");
    });

    it("exibe os info cards corretamente", () => {
      cy.contains("Linguagem principal").should("be.visible");
      cy.contains("C").should("be.visible");
      cy.contains("Branch padrão").should("be.visible");
      cy.contains("master").should("be.visible");
      cy.contains("Criado em").should("be.visible");
      cy.contains("Última atualização").should("be.visible");
    });

    it("exibe os tópicos do repositório", () => {
      cy.contains("kernel").should("be.visible");
      cy.contains("linux").should("be.visible");
      cy.contains("operating-system").should("be.visible");
    });

    it("exibe a clone URL", () => {
      cy.contains("Clone URL").should("be.visible");
      cy.contains("torvalds/linux.git").should("be.visible");
    });

    it("copia a clone URL ao clicar no botão", () => {
      cy.window().then((win) => {
        cy.stub(win.navigator.clipboard, "writeText").resolves().as("copy");
      });

      cy.get('[title="Copiar"]').click();
      cy.get("@copy").should(
        "have.been.calledOnceWith",
        "https://github.com/torvalds/linux.git",
      );
    });

    it('link "Ver no GitHub" aponta para a URL correta', () => {
      cy.contains("Ver no GitHub")
        .should("have.attr", "href")
        .and("eq", "https://github.com/torvalds/linux");
    });

    it("clique no owner navega para o perfil", () => {
      cy.contains("button", user.login).click();
      cy.url().should("include", `/user/${user.login}`);
    });

    it("botão Voltar retorna para o perfil do usuário", () => {
      cy.contains("Voltar").click();
      cy.url().should("include", `/user/${user.login}`);
    });

    it("exibe erro quando o repositório não existe", () => {
      cy.intercept("GET", "**/repos/torvalds/repo-inexistente", {
        statusCode: 404,
        body: { message: "Not Found" },
      }).as("notFound");

      cy.visit(`/user/${user.login}/repo/repo-inexistente`);
      cy.wait("@notFound");

      cy.contains("Repositório não encontrado").should("be.visible");
    });
  });
});
