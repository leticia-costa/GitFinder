import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserPage.module.scss";
import type { Repository } from "../../repository/types/Repositoty";
import { useGetUser } from "../hooks/useGetUser";
import { useSearchUserRepos } from "../hooks/useSearchUserRepos";
import { Button } from "../../../common/components/Button/Button";
import { Avatar } from "../../../common/components/Avatar/Avatar";
import { StatBadge } from "../../../common/components/StatBadge/StatBadge";
import { TextInput } from "../../../common/components/TextInput/TextInput";
import { RadioGroup } from "../../../common/components/RadioGroup/RadioGroup";
import { RepoTable } from "../components/RepoTable/RepoTable";
import { Logo } from "../../../common/components/Logo/Logo";

type SortKey = "name-asc" | "name-desc" | "stars-desc" | "stars-asc";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Nome A-Z" },
  { value: "name-desc", label: "Nome Z-A" },
  { value: "stars-desc", label: "Mais estrelas" },
  { value: "stars-asc", label: "Menos estrelas" },
];

function sortRepos(repos: Repository[], key: SortKey) {
  return [...repos].sort((a, b) => {
    switch (key) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "stars-desc":
        return b.stargazers_count - a.stargazers_count;
      case "stars-asc":
        return a.stargazers_count - b.stargazers_count;
    }
  });
}

export const UserPage = () => {
  const { userName = "" } = useParams<{ userName: string }>();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<SortKey>("stars-desc");

  const {
    data: user,
    isLoading: loadingUser,
    isError: userError,
  } = useGetUser(userName);
  const { data: repos = [], isLoading: loadingRepos } =
    useSearchUserRepos(userName);

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  const processedRepos = useMemo(() => {
    const filtered = filter
      ? repos.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase()))
      : repos;
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
      <div className={styles.centered}>
        <p>Usuário não encontrado.</p>
      </div>
    );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            leftIcon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            }
          >
            Voltar
          </Button>
        </div>
        <Logo size="sm" />
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <Avatar src={user.avatar_url} alt={user.login} size="xl" />

          <div className={styles.identity}>
            {user.name && <h1 className={styles.name}>{user.name}</h1>}
            <p className={styles.userName}>@{user.login}</p>
          </div>

          {user.bio && <p className={styles.bio}>{user.bio}</p>}

          <div className={styles.stats}>
            <StatBadge
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              label="seguidores"
              value={user.followers}
            />
            <StatBadge
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              }
              label="seguindo"
              value={user.following}
            />
            <StatBadge
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              }
              label="stars totais"
              value={totalStars}
            />
          </div>

          <div className={styles.meta}>
            {user.location && (
              <span className={styles.metaItem}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {user.location}
              </span>
            )}
            {user.blog && (
              <a
                className={styles.metaItem}
                href={user.blog}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {user.blog.replace(/^https?:\/\//, "")}
              </a>
            )}
            {user.company && (
              <span className={styles.metaItem}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {user.company}
              </span>
            )}
          </div>

          <a
            className={styles.githubLink}
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
          >
            Ver perfil no GitHub →
          </a>
        </aside>

        <main className={styles.main}>
          <div className={styles.reposHeader}>
            <h2 className={styles.reposTitle}>
              Repositórios
              <span className={styles.reposCount}>{repos.length}</span>
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
                options={SORT_OPTIONS}
                value={sort}
                onChange={(v) => setSort(v as SortKey)}
              />
            </div>
          </div>

          {loadingRepos ? (
            <div className={styles.centered}>
              <span className={styles.spinner} />
            </div>
          ) : (
            <RepoTable repos={processedRepos} login={userName} />
          )}
        </main>
      </div>
    </div>
  );
};
