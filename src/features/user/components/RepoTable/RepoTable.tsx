import { EmptyState } from "../../../../common/components/EmptyState/EmptyState";
import type { Repository } from "../../../repository/types/Repositoty";
import styles from "./RepoTable.module.scss";
import { useNavigate } from "react-router-dom";

interface RepoTableProps {
  repos: Repository[];
  login: string;
  hasFilters?: boolean;
}

export const RepoTable = ({ repos, login, hasFilters }: RepoTableProps) => {
  const navigate = useNavigate();

  if (!hasFilters && repos.length === 0) {
    return (
      <EmptyState
        type="not-found"
        title="Nenhum repositório encontrado."
        description="Não há repositórios para exibir."
      />
    );
  }
  if (hasFilters && repos.length === 0)
    return (
      <EmptyState
        type="not-found"
        title="Nenhum repositório encontrado."
        description="Tente um nome de repositório diferente."
      />
    );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Repositório</th>
            <th>Linguagem</th>
            <th>⭐ Stars</th>
            <th>🍴 Forks</th>
            <th>🐛 Issues</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr
              key={repo.id}
              className={styles.row}
              onClick={() => navigate(`/user/${login}/repo/${repo.name}`)}
            >
              <td>
                <div className={styles.repoName}>{repo.name}</div>
                {repo.description && (
                  <div className={styles.repoDesc}>{repo.description}</div>
                )}
              </td>
              <td>
                {repo.language ? (
                  <span className={styles.lang}>{repo.language}</span>
                ) : (
                  <span className={styles.noLang}>—</span>
                )}
              </td>
              <td className={styles.number}>
                {repo.stargazers_count.toLocaleString("pt-BR")}
              </td>
              <td className={styles.number}>
                {repo.forks_count.toLocaleString("pt-BR")}
              </td>
              <td className={styles.number}>
                {repo.open_issues_count.toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
