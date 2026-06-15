import { useCallback } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  value: string;
  setValue: (value: string) => void;
}

export const SearchBar = ({
  onSearch,
  isLoading = false,
  value,
  setValue,
}: SearchBarProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
      setValue(e.target.value);
    },
    [onSearch, setValue],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>

        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Buscar usuário no GitHub..."
          autoFocus
          spellCheck={false}
        />

        {isLoading && (
          <span className={styles.spinner} aria-label="Buscando..." />
        )}

        {value && !isLoading && (
          <button
            className={styles.clearButton}
            onClick={() => {
              setValue("");
              onSearch("");
            }}
            aria-label="Limpar busca"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {value && (
        <p className={styles.hint}>
          Pressione <kbd>Enter</kbd> ou aguarde os resultados
        </p>
      )}
    </div>
  );
};
