import user from "../fixtures/user.json";

describe("GitFinder — Página do usuário", () => {
  // ─── UserPage ─────────────────────────────────────────────────────

  describe("UserPage", () => {
    beforeEach(() => {
      cy.mockGitHubApi();
      cy.visit(`/user/${user.login}`);
      cy.wait("@getUser");
      cy.wait("@getUserRepos");
    });

    it("exibe os dados do perfil do usuário", () => {
      cy.contains("Linus Torvalds").should("be.visible");
      cy.contains(`@${user.login}`).should("be.visible");
      cy.contains("Just for fun").should("be.visible");
      cy.contains("Portland, OR").should("be.visible");
    });

    it("exibe os StatBadges com valores corretos", () => {
      cy.contains("seguidores").should("be.visible");
      cy.contains("230.000").should("be.visible");
      cy.contains("seguindo").should("be.visible");
      cy.contains("stars totais").should("be.visible");
    });

    it("exibe a tabela com os repositórios mockados", () => {
      cy.contains("Repositórios").should("be.visible");
      cy.get("table").should("exist");
      cy.get("tbody tr").should("have.length", 3);
      cy.contains("linux").should("be.visible");
      cy.contains("subsurface").should("be.visible");
      cy.contains("uemacs").should("be.visible");
    });

    it("filtra repositórios pelo nome", () => {
      cy.get('input[placeholder*="Ex: react"]').type("linux");

      cy.get("tbody tr").should("have.length", 1);
      cy.contains("linux").should("be.visible");
    });

    it("ordena repositórios por Nome A-Z", () => {
      cy.contains("Nome A-Z").click();

      cy.get("tbody tr td:first-child").then(($cells) => {
        const names = [...$cells].map(
          (el) => el.textContent?.trim().toLowerCase() ?? "",
        );
        expect(names).to.deep.equal([...names].sort());
      });
    });

    it("ordena repositórios por Mais estrelas", () => {
      cy.contains("Mais estrelas").click();

      cy.get("tbody tr").then(($rows) => {
        const stars = [...$rows].map((row) => {
          const cells = row.querySelectorAll("td");
          return parseInt(cells[2]?.textContent?.replace(/\D/g, "") ?? "0", 10);
        });
        expect(stars).to.deep.equal([...stars].sort((a, b) => b - a));
      });
    });

    it("botão Voltar retorna para a SearchPage", () => {
      cy.visit("/");
      cy.get('input[placeholder*="Buscar"]').type(user.login);
      cy.contains(user.login).closest("article").click();
      cy.wait("@getUser");

      cy.contains("Voltar").click();
      cy.url().should("include", `?q=${user.login}`);
    });
  });

  // ─── Navegação User → Repository ─────────────────────────────────

  describe("Navegação UserPage → RepositoryPage", () => {
    beforeEach(() => {
      cy.mockGitHubApi();
      cy.visit(`/user/${user.login}`);
      cy.wait("@getUser");
      cy.wait("@getUserRepos");
    });

    it("navega para o repositório ao clicar na linha da tabela", () => {
      cy.get("tbody tr").contains(user.repo).click();

      cy.url().should("include", `/user/${user.login}/repo/${user.repo}`);
      cy.wait("@getRepo");
    });
  });
});
