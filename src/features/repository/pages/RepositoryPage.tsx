import { useNavigate, useParams } from "react-router-dom";
import styles from "./RepositoryPage.module.scss";
import { useGetRepository } from "../hooks/useGetRepository";
import { Button } from "../../../common/components/Button/Button";
import { Header } from "../../../common/components/Header/Header";
import { RepositoryHero } from "../components/RepositoryHero/RepositoryHero";
import { InfoGrid } from "../components/InfoGrid/InfroGrid";

export const RepositoryPage = () => {
  const { userName = "", repo = "" } = useParams<{
    userName: string;
    repo: string;
  }>();

  const { data, isLoading, isError } = useGetRepository(userName, repo);
  
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <span className={styles.spinner} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={styles.centered}>
        <p className={styles.errorText}>Repositório não encontrado.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header backButtonLabel={`Voltar para ${userName}`} />
      <div className={styles.layout}>
        <RepositoryHero data={data} userName={userName} />
        <InfoGrid data={data} />
      </div>
    </div>
  );
};
