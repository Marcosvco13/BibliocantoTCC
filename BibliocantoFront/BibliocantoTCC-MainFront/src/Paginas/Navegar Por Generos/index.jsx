import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

function NavegarGenero() {
  const [error, setError] = useState(null);
  const [generosComLivros, setGenerosComLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenerosComLivros = async () => {
        try {
          setLoading(true);
      
          // Buscar gêneros
          const generos = await api.getGeneros();
      
          const generosComDetalhes = await Promise.all(
            generos.map(async (genero) => {
              console.log(`Buscando livros para o gênero: ${genero.nomegenero} (ID: ${genero.id})`);
      
              if (!genero.id) {
                console.error(`ID inválido para o gênero: ${genero.nomegenero}`);
                return { ...genero, livros: [] };
              }
      
              try {
                // Buscar dados do gênero
                const generoLivroData = await api.getLivrosByGenero(genero.id);
      
                // Extrair idLivro da resposta
                const livroId = generoLivroData?.idLivro;
                if (!livroId) {
                  console.warn(`Nenhum livro encontrado para o gênero ${genero.nomegenero}`);
                  return { ...genero, livros: [] };
                }
      
                // Buscar detalhes do livro
                const livroDetalhado = await api.getLivroById(livroId);
      
                return { ...genero, livros: [livroDetalhado] };
              } catch (err) {
                console.error(
                  `Erro ao buscar livros para o gênero ${genero.nomegenero}:`,
                  err
                );
                return { ...genero, livros: [] };
              }
            })
          );
      
          setGenerosComLivros(generosComDetalhes);
        } catch (err) {
          setError("Erro ao carregar os gêneros e livros.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
    fetchGenerosComLivros();
  }, []);

  return (
    <div className="container">
      {loading && <p>Carregando os gêneros e livros...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && generosComLivros.length > 0 ? (
        generosComLivros.map((genero) => (
          <div key={genero.id} className="mb-4">
            <h5 className="text-primary">{genero.nomegenero}</h5>
            <div className="d-flex flex-row flex-wrap">
              {genero.livros && genero.livros.length > 0 ? (
                genero.livros.map((livro) => (
                  <img
                    key={livro.id}
                    src={livro.caminhoImagem}
                    alt={livro.titulo}
                    className="m-2"
                    style={{
                      width: "100px",
                      height: "150px",
                      cursor: "pointer",
                    }}
                    title={livro.titulo}
                  />
                ))
              ) : (
                <p>Nenhum livro disponível nesse gênero.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        !loading && <p>Nenhum gênero encontrado.</p>
      )}
    </div>
  );
}

export default NavegarGenero;
