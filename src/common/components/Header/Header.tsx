import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { Logo } from "../Logo/Logo";
import styles from "./Header.module.scss";

interface HeaderProps {
  backButtonLabel?: string;
}

export const Header = ({ backButtonLabel }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          leftIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          }
        >
          {backButtonLabel || "Voltar"}
        </Button>
      </div>
      <Logo size="sm" />
    </header>
  );
};
