import user from "../fixtures/user.json";

describe("GitFinder — User Profile Page", () => {
  describe("UserPage", () => {
    beforeEach(() => {
      cy.mockGitHubApi();
      cy.visit(`/user/${user.login}`);
      cy.wait("@getUser");
      cy.wait("@getUserRepos");
    });

    it("displays user profile information", () => {
      cy.contains("Linus Torvalds").should("be.visible");
      cy.contains(`@${user.login}`).should("be.visible");
      cy.contains("Just for fun").should("be.visible");
      cy.contains("Portland, OR").should("be.visible");
    });

    it("displays user statistics", () => {
      cy.contains("seguidores").should("be.visible");
      cy.contains("230.000").should("be.visible");
      cy.contains("seguindo").should("be.visible");
      cy.contains("stars totais").should("be.visible");
    });

    it("displays the repositories table", () => {
      cy.contains("Repositórios").should("be.visible");
      cy.get("table").should("exist");
      cy.get("tbody tr").should("have.length", 3);

      cy.contains("linux").should("be.visible");
      cy.contains("subsurface").should("be.visible");
      cy.contains("uemacs").should("be.visible");
    });

    it("filters repositories by name", () => {
      cy.get('input[placeholder*="Ex: react"]').type("linux");

      cy.get("tbody tr").should("have.length", 1);
      cy.contains("linux").should("be.visible");
    });

    it("sorts repositories by name in ascending order", () => {
      cy.contains("Nome A-Z").click();

      cy.get("tbody tr td:first-child").then(($cells) => {
        const names = [...$cells].map(
          (el) => el.textContent?.trim().toLowerCase() ?? "",
        );

        expect(names).to.deep.equal([...names].sort());
      });
    });

    it("sorts repositories by stars in descending order", () => {
      cy.contains("Mais estrelas").click();

      cy.get("tbody tr").then(($rows) => {
        const stars = [...$rows].map((row) => {
          const cells = row.querySelectorAll("td");

          return parseInt(cells[2]?.textContent?.replace(/\D/g, "") ?? "0", 10);
        });

        expect(stars).to.deep.equal([...stars].sort((a, b) => b - a));
      });
    });

    it("displays an empty state when no repositories match the search", () => {
      cy.get('input[placeholder*="Ex: react"]').type(
        "repository-that-does-not-exist",
      );

      cy.contains("Nenhum repositório encontrado").should("be.visible");
      cy.contains("Tente um nome de repositório diferente").should(
        "be.visible",
      );

      cy.get("tbody tr").should("not.exist");
    });

    it("displays an empty state when the user has no repositories", () => {
      cy.intercept("GET", `**/users/${user.login}/repos**`, {
        statusCode: 200,
        body: [],
      }).as("emptyRepos");

      cy.visit(`/user/${user.login}`);

      cy.wait("@getUser");
      cy.wait("@emptyRepos");

      cy.contains("Nenhum repositório encontrado").should("be.visible");
      cy.contains("Não há repositórios para exibir.").should("be.visible");
    });

    it("returns to the search page when clicking Back", () => {
      cy.visit("/");

      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.contains(user.login).closest("article").click();

      cy.wait("@getUser");

      cy.contains("Voltar").click();

      cy.url().should("include", `?q=${user.login}`);
    });
  });

  describe("Navigation to Repository Page", () => {
    beforeEach(() => {
      cy.mockGitHubApi();

      cy.visit(`/user/${user.login}`);
      cy.wait("@getUser");
      cy.wait("@getUserRepos");
    });

    it("navigates to the repository page when clicking a repository row", () => {
      cy.get("tbody tr").contains(user.repo).click();

      cy.url().should("include", `/user/${user.login}/repo/${user.repo}`);

      cy.wait("@getRepo");
    });
  });
});
