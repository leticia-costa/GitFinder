import styles from './LoadingGrid.module.scss'

interface LoadingGridProps {
  count?: number
}

export function LoadingGrid({ count = 6 }: LoadingGridProps) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeleton}>
          <div className={styles.avatarSkeleton} />
          <div className={styles.infoSkeleton}>
            <div className={styles.lineSkeleton} style={{ width: '40%' }} />
            <div className={styles.lineSkeleton} style={{ width: '65%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}