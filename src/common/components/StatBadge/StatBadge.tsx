import styles from "./StatBadge.module.scss";

interface StatBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}

export const StatBadge = ({ icon, label, value }: StatBadgeProps) => {
  return (
    <div className={styles.badge}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.value}>
        {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
