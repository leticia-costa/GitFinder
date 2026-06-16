import { useNavigate } from "react-router-dom";
import styles from "./Logo.module.scss";
import logoImg from '../../../assets/logo.png'

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ size = "lg" }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.logo} ${styles[size]}`}
      onClick={() => navigate("/")}
    >
      <img
        src={logoImg}
        alt="GitFinder Logo"
        className={styles.logoImage}
      />
      <h1 className={styles.logoText}>Git Finder</h1>
    </div>
  );
};
