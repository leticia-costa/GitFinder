import { useCallback, useState } from "react";
import { useSearchUsers } from "../hooks/useSearchUsers";
import { LoadingGrid } from "../components/LoadingGrid";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../../../common/components/SearchBar";
import styles from "./SearchPage.module.scss";
import { UserCard } from "../../../common/components/UserCard";
import { useDebounce } from "../../../common/hooks/useDebounce";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const debouncedSearch = useDebounce(query, 1000);

  const { data, isLoading, isError } = useSearchUsers(debouncedSearch);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const hasResults = data && data.items.length > 0;
  const isEmpty = data && data.items.length === 0 && query.length > 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <div className={styles.logoTitle}>
              <img
                src="/src/assets/logo.png"
                alt="GitFinder Logo"
                className={styles.logoImage}
              />
              <h1 className={styles.logoText}>Git Finder</h1>
            </div>
            <span className={styles.logoSubtitle}>
              Encontre usuários do GitHub com facilidade
            </span>
          </div>

          <div className={styles.searchWrapper}>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
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
