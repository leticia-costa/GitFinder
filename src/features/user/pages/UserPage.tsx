import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserPage.module.scss";
import { useGetUser } from "../hooks/useGetUser";
import { TextInput } from "../../../common/components/TextInput/TextInput";
import { RadioGroup } from "../../../common/components/RadioGroup/RadioGroup";
import { RepoTable } from "../components/RepoTable/RepoTable";
import { Header } from "../../../common/components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import {
  SORT_REPO_OPTIONS,
  sortRepos,
  type RepoSortKey,
} from "../utils/SortRepos/sortRepos";
import { useUserRepos } from "../hooks/useUserRepos";
import { Button } from "../../../common/components/Button/Button";
import { EmptyState } from "../../../common/components/EmptyState/EmptyState";
import { filterRepos } from "../utils/FilterRepos/filterRepos";

export const UserPage = () => {
  const { userName = "" } = useParams<{ userName: string }>();

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<RepoSortKey>("stars-desc");

  const {
    data: user,
    isLoading: loadingUser,
    isError: userError,
  } = useGetUser(userName);

  const {
    repos,
    isLoading: loadingRepos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserRepos(userName);

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  const processedRepos = useMemo(() => {
    const filtered = filterRepos(repos, filter);
    return sortRepos(filtered, sort);
  }, [repos, filter, sort]);

  if (loadingUser)
    return (
      <div className={styles.centered}>
        <span className={styles.spinner} />
      </div>
    );
  if (userError || !user)
    return (
      <EmptyState
        title="Usuário não encontrado."
        description="Não foi possível localizar este usuario."
        type="error"
      />
    );

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.layout}>
        <Sidebar user={user} totalStars={totalStars} />
        <main className={styles.main}>
          <div className={styles.reposHeader}>
            <h2 className={styles.reposTitle}>
              Repositórios
              <span className={styles.reposCount}>{user?.public_repos}</span>
            </h2>
          </div>

          <div className={styles.controls}>
            <div className={styles.filterBox}>
              <TextInput
                label="Filtrar por nome"
                placeholder="Ex: react, api, bot..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                leftIcon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                }
              />
            </div>

            <div className={styles.sortBox}>
              <RadioGroup
                label="Ordenar por"
                name="sort"
                options={SORT_REPO_OPTIONS}
                value={sort}
                onChange={(v) => setSort(v as RepoSortKey)}
              />
            </div>
          </div>

          {loadingRepos ? (
            <div className={styles.centered}>
              <span className={styles.spinner} />
            </div>
          ) : (
            <>
              <RepoTable
                repos={processedRepos}
                login={userName}
                hasFilters={!!filter}
              />

              {hasNextPage && (
                <Button
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  isLoading={isFetchingNextPage}
                >
                  Carregar mais{" "}
                  {isFetchingNextPage ? "" : `(${repos.length} carregados)`}
                </Button>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
