import { useNavigate } from 'react-router-dom'
import styles from './UserCard.module.scss'
import type { UserSearchItem } from '../../types/UserSearchItem'
import { Avatar } from '../../../../common/components/Avatar/Avatar'

interface UserCardProps {
  user: UserSearchItem
}

export const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate()

  return (
    <>
    <article
      className={styles.card}
      onClick={() => navigate(`/user/${user.login}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/user/${user.login}`)}
    >
      <Avatar src={user.avatar_url} alt={`Avatar de ${user.login}`} size="md" />

      <div className={styles.info}>
        <span className={styles.login}>{user.login}</span>
        <a
          className={styles.profileLink}
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          github.com/{user.login}
        </a>
      </div>

      <span className={styles.arrow}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>
    </article>
     </>
  )
}