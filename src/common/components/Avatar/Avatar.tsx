import styles from './Avatar.module.scss'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src: string
  alt: string
  size?: AvatarSize
}

export const Avatar = ({ src, alt, size = 'md' }: AvatarProps) => {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <img className={styles.img} src={src} alt={alt} loading="lazy" />
    </div>
  )
}