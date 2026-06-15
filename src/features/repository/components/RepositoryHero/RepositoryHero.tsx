import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../../common/components/Avatar/Avatar";
import styles from "./RepositoryHero.module.scss";
import type { Repository } from "../../types/Repositoty";
import { StatBadge } from "../../../../common/components/StatBadge/StatBadge";

interface RepositoryHeroProps {
  data: Repository;
  userName: string;
}

export const RepositoryHero = ({ data, userName }: RepositoryHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.heroTop}>
        <div className={styles.repoMeta}>
          <Avatar
            src={data.owner.avatar_url}
            alt={data.owner.login}
            size="md"
          />
          <div className={styles.breadcrumb}>
            <button
              className={styles.ownerLink}
              onClick={() => navigate(`/user/${userName}`)}
            >
              {data.owner.login}
            </button>
            <span className={styles.separator}>/</span>
            <span className={styles.repoName}>{data.name}</span>
            {data.private && <span className={styles.badge}>Private</span>}
            {data.fork && <span className={styles.badgeFork}>Fork</span>}
          </div>
        </div>

        <a
          className={styles.githubButton}
          href={data.html_url}
          target="_blank"
          rel="noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 98 96" fill="currentColor">
            <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
          </svg>
          Ver no GitHub
        </a>
      </div>

      {data.description && (
        <p className={styles.description}>{data.description}</p>
      )}

      {data.topics && data.topics.length > 0 && (
        <div className={styles.topics}>
          {data.topics.map((topic) => (
            <span key={topic} className={styles.topic}>
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className={styles.statsRow}>
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
          label="stars"
          value={data.stargazers_count}
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
              <circle cx="12" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
              <path d="M12 12v3" />
            </svg>
          }
          label="forks"
          value={data.forks_count}
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
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          }
          label="issues abertas"
          value={data.open_issues_count}
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
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          }
          label="watchers"
          value={data.watchers_count}
        />
      </div>
    </section>
  );
};
