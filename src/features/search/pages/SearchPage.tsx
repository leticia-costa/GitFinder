import { useCallback } from "react";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { LoadingGrid } from "../components/LoadingGrid";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import styles from "./SearchPage.module.scss";
import { UserCard } from "../components/UserCard";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { Logo } from "../../../common/components/Logo/Logo";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const debouncedSearch = useDebounce(query, 1000);

  const { data, isLoading, isError } = useSearchUsers(debouncedSearch);

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

  const hasResults = data && data.items.length > 0;
  const isEmpty = data && data.items.length === 0 && query.length > 0;

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
            />
          </div>

          {hasResults && (
            <p className={styles.count}>
              {data.total_count.toLocaleString("pt-BR")} usuários encontrados
            </p>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {isLoading && <LoadingGrid count={6} />}
        {!isLoading && isError && <EmptyState type="error" />}
        {!isLoading && isEmpty && <EmptyState type="not-found" query={query} />}
        {!isLoading && !query && <EmptyState type="idle" />}
        {!isLoading && hasResults && (
          <div className={styles.grid}>
            {data.items.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
