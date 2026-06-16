import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  type: "idle" | "not-found" | "error";
  query?: string;
  title: string;
  description: string;
}

const states = {
  idle: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  'not-found': {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  error: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
}

export const EmptyState = ({ type, query, title, description }: EmptyStateProps) => {
  const state = states[type]

  return (
    <div className={styles.container}>
      <span className={`${styles.icon} ${styles[type]}`}>
        {state.icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>
        {type === 'not-found' && query
          ? `Nenhum resultado para "${query}". ${description}`
          : description}
      </p>
    </div>
  )
}