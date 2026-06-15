import { Avatar } from "../../../../common/components/Avatar/Avatar";
import { StatBadge } from "../../../../common/components/StatBadge/StatBadge";
import type { User } from "../../types/User";
import styles from "./Sodebar.module.scss";

interface SidebarProps {
  user: User;
  totalStars: number;
}

export const Sidebar = ({ user, totalStars }: SidebarProps) => {
  return (
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
  );
};
