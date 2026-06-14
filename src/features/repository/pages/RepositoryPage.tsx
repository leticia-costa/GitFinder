import { useNavigate, useParams } from "react-router-dom";
import { useGetRepository } from "../hooks/useGetRepository";

export const RepositoryPage = () => {
  const { userName, repo } = useParams<{ userName: string; repo: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRepository(userName ?? "", repo ?? "");

  if (isLoading) return <p>Carregando repositório...</p>;
  if (isError) return <p>Repositório não encontrado.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Voltar</button>

      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <p>⭐ {data?.stargazers_count}</p>
      <p>🍴 {data?.forks_count}</p>
      <p>🐛 {data?.open_issues_count}</p>
      <p>Linguagem: {data?.language}</p>
      <a href={data?.html_url} target="_blank" rel="noreferrer">
        Ver no GitHub
      </a>
    </div>
  );
}