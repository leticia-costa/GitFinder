import type { Repository } from '../../../repository/types/Repositoty'
import styles from './RepoTable.module.scss'
import { useNavigate } from 'react-router-dom'

interface RepoTableProps {
  repos: Repository[]
  login: string
}

export const RepoTable = ({ repos, login }: RepoTableProps) => {
  const navigate = useNavigate()

  if (repos.length === 0) {
    return <p className={styles.empty}>Nenhum repositório encontrado.</p>
  }

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
              <td className={styles.number}>{repo.stargazers_count.toLocaleString('pt-BR')}</td>
              <td className={styles.number}>{repo.forks_count.toLocaleString('pt-BR')}</td>
              <td className={styles.number}>{repo.open_issues_count.toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}