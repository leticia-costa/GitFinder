import { useCallback } from "react";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { LoadingGrid } from "../components/LoadingGrid/LoadingGrid";
import { EmptyState } from "../../../common/components/EmptyState/EmptyState";
import { SearchBar } from "../components/SearchBar/SearchBar";
import styles from "./SearchPage.module.scss";
import { UserCard } from "../components/UserCard/UserCard";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { Logo } from "../../../common/components/Logo/Logo";
import { Button } from "../../../common/components/Button/Button";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const debouncedSearch = useDebounce(query, 1000);

  const {
    users,
    total,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchUsers(debouncedSearch);

  const handleSearch = useCallback(
    (value: string) => {
      if (value) {
        setSearchParams({ q: value });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams],
  );

  const hasResults = users && total > 0;
  const isEmpty = users && total === 0 && query.length > 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <Logo />
            <span className={styles.logoSubtitle}>
              Encontre usuários do GitHub com facilidade
            </span>
          </div>

          <div className={styles.searchWrapper}>
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
              value={query}
              setValue={(value) => setSearchParams(value ? { q: value } : {})}
            />
          </div>

          {hasResults && (
            <p className={styles.count}>
              {total.toLocaleString("pt-BR")} usuários encontrados
            </p>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {isLoading && <LoadingGrid count={6} />}
        {!isLoading && isError && (
          <EmptyState
            type="error"
            title="Algo deu errado"
            description="Não foi possível completar a busca. Verifique sua conexão e tente novamente."
          />
        )}
        {!isLoading && isEmpty && (
          <EmptyState
            type="not-found"
            query={query}
            title="Nenhum usuário encontrado"
            description="Tente um nome de usuário diferente."
          />
        )}
        {!isLoading && !query && (
          <EmptyState
            type="idle"
            title="Busque um usuário do GitHub"
            description="Digite um nome de usuário para começar a explorar perfis e repositórios."
          />
        )}
        {!isLoading && hasResults && (
          <div className={styles.grid}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
            {hasNextPage && (
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                Carregar mais{" "}
                {isFetchingNextPage ? "" : `(${users.length} carregados)`}
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
