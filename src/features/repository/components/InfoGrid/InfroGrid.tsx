import type { Repository } from "../../types/Repositoty";
import styles from "./InfroGrid.module.scss";
import { formatDate } from "../../../../common/utils/formatDate/formatDate";

interface InfoGridProps {
  data: Repository;
}
export const InfoGrid = ({ data }: InfoGridProps) => {
  return (
    <section className={styles.infoGrid}>
      <div className={styles.infoCard}>
        <h3 className={styles.infoLabel}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Linguagem principal
        </h3>
        <p className={styles.infoValue}>
          {data.language ? (
            <span className={styles.langTag}>{data.language}</span>
          ) : (
            "—"
          )}
        </p>
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.infoLabel}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
          Branch padrão
        </h3>
        <p className={styles.infoValue}>
          <span className={styles.branchTag}>{data.default_branch}</span>
        </p>
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.infoLabel}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Criado em
        </h3>
        <p className={styles.infoValue}>{formatDate(data.created_at)}</p>
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.infoLabel}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-.49-4.5" />
          </svg>
          Última atualização
        </h3>
        <p className={styles.infoValue}>{formatDate(data.updated_at)}</p>
      </div>

      {data.clone_url && (
        <div className={`${styles.infoCard} ${styles.infoCardWide}`}>
          <h3 className={styles.infoLabel}>
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
            Clone URL
          </h3>
          <div className={styles.cloneRow}>
            <code className={styles.cloneUrl}>{data.clone_url}</code>
            <button
              className={styles.copyButton}
              onClick={() => navigator.clipboard.writeText(data.clone_url)}
              title="Copiar"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
