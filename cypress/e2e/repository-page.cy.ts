import user from "../fixtures/user.json";

describe("GitFinder — Repository Page", () => {
  describe("RepositoryPage", () => {
    beforeEach(() => {
      cy.mockGitHubApi();
      cy.visit(`/user/${user.login}/repo/${user.repo}`);
      cy.wait("@getRepo");
    });

    it("displays the repository breadcrumb", () => {
      cy.contains("button", user.login).should("be.visible");
      cy.contains(user.repo).should("be.visible");
    });

    it("displays repository statistics", () => {
      cy.contains("180.000").should("be.visible");
      cy.contains("stars").should("be.visible");
      cy.contains("55.000").should("be.visible");
      cy.contains("forks").should("be.visible");
      cy.contains("312").should("be.visible");
      cy.contains("issues abertas").should("be.visible");
    });

    it("displays repository details", () => {
      cy.contains("Linguagem principal").should("be.visible");
      cy.contains("C").should("be.visible");
      cy.contains("Branch padrão").should("be.visible");
      cy.contains("master").should("be.visible");
      cy.contains("Criado em").should("be.visible");
      cy.contains("Última atualização").should("be.visible");
    });

    it("displays repository topics", () => {
      cy.contains("kernel").should("be.visible");
      cy.contains("linux").should("be.visible");
      cy.contains("operating-system").should("be.visible");
    });

    it("displays the clone URL", () => {
      cy.contains("Clone URL").should("be.visible");
      cy.contains("torvalds/linux.git").should("be.visible");
    });

    it("copies the clone URL to the clipboard", () => {
      cy.window().then((win) => {
        cy.stub(win.navigator.clipboard, "writeText").resolves().as("copy");
      });

      cy.get('[title="Copiar"]').click();

      cy.get("@copy").should(
        "have.been.calledOnceWith",
        "https://github.com/torvalds/linux.git",
      );
    });

    it("provides a link to the GitHub repository", () => {
      cy.contains("Ver no GitHub")
        .should("have.attr", "href")
        .and("eq", "https://github.com/torvalds/linux");
    });

    it("displays an error message when the repository does not exist", () => {
      cy.intercept("GET", "**/repos/torvalds/repo-inexistente", {
        statusCode: 404,
        body: { message: "Not Found" },
      }).as("notFound");

      cy.visit(`/user/${user.login}/repo/repo-inexistente`);
      cy.wait("@notFound");

      cy.contains("Repositório não encontrado").should("be.visible");
    });
    it("displays an empty state when no repository data is returned", () => {
      cy.intercept("GET", "**/repos/torvalds/repo-inexistente", {
        statusCode: 200,
        body: null,
      }).as("emptyRepository");

      cy.visit(`/user/${user.login}/repo/repo-inexistente`);
      cy.wait("@emptyRepository");

      cy.contains("Repositório não encontrado").should("be.visible");
    });
  });
});
