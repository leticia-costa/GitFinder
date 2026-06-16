import user from "../fixtures/user.json";

describe("GitFinder — Search Page", () => {
  describe("SearchPage", () => {
    beforeEach(() => {
      cy.mockGitHubApi();
      cy.visit("/");
    });

    it("displays the initial empty state", () => {
      cy.contains("Busque um usuário do GitHub").should("be.visible");

      cy.get('input[placeholder*="Buscar"]')
        .should("be.visible")
        .and("be.focused");
    });

    it("displays search results", () => {
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");

      cy.get("article").should("have.length", 2);
      cy.contains(user.login).should("be.visible");
    });

    it("displays the total number of search results", () => {
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");

      cy.contains("2").should("be.visible");
      cy.contains("usuários encontrados").should("be.visible");
    });

    it("displays a not found state when no users match the search", () => {
      cy.intercept("GET", "**/search/users**", {
        body: {
          total_count: 0,
          incomplete_results: false,
          items: [],
        },
      }).as("emptySearch");

      cy.get('input[placeholder*="Buscar"]').type("xyzxyz123");
      cy.wait("@emptySearch");

      cy.contains("Nenhum usuário encontrado").should("be.visible");
    });

    it("displays an error state when the API request fails", () => {
      cy.intercept("GET", "**/search/users**", {
        statusCode: 500,
      }).as("errorSearch");

      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@errorSearch");

      cy.contains("Algo deu errado").should("be.visible");
    });

    it("clears the search input when clicking the clear button", () => {
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");

      cy.get('[aria-label="Limpar busca"]').click();

      cy.get('input[placeholder*="Buscar"]').should("have.value", "");
      cy.contains("Busque um usuário do GitHub").should("be.visible");
    });
  });

  describe("Navigation to User Profile", () => {
    beforeEach(() => {
      cy.mockGitHubApi();

      cy.visit("/");

      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.wait("@searchUsers");
    });

    it("navigates to the user profile when clicking a user card", () => {
      cy.contains(user.login).closest("article").click();

      cy.url().should("include", `/user/${user.login}`);
      cy.wait("@getUser");
    });
  });
});