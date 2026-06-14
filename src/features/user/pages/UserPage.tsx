import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";

export const UserPage = () => {
  const { userName } = useParams<{ userName: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUser(userName ?? "");

  if (isLoading) return <p>Carregando usuário...</p>;
  if (isError) return <p>Usuário não encontrado.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Voltar</button>

      <img src={data?.avatar_url} alt={data?.login} width={80} />
      <h1>{data?.name}</h1>
      <p>{data?.bio}</p>
      <p>Repos públicos: {data?.public_repos}</p>
      <p>Seguidores: {data?.followers}</p>

      <h2>Buscar repositório</h2>
      <input
        type="text"
        placeholder="Nome do repositório..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const repo = (e.target as HTMLInputElement).value;
            navigate(`/user/${userName}/repo/${repo}`);
          }
        }}
      />
    </div>
  );
}