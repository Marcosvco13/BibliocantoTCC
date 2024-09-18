import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Linha.css";

function Linha() {
  const [livros, setLivros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState(null);

  const [email] = useState(localStorage.getItem('email') || null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.getLivros(setLivros);
        await api.getGeneros(setGeneros);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Função para agrupar livros por gênero
  const livrosPorGenero = generos.map((genero) => {
    return {
      ...genero,
      livros: livros.filter((livro) =>
        livro.generos.nomegenero === genero.nomegenero
      ),
    };
  });

  return (
    <div className="linha-container">
      <div className="linha-crear">
      
      {email && (
        <>
          <span>
            <Link to="/CadastrarLivro">Cadastrar Livro</Link>
          </span>
          <hr className="hrLinha" style={{ color: 'white' }} />
        </>
      )}

      </div>
      {error && <p className="error">{error}</p>}
      {livrosPorGenero.length > 0 ? (
        livrosPorGenero.map((genero) => (
          <div key={genero.id} className="genero">
            <h3 className="linha-titulo">{genero.nomegenero}</h3>
            <div className="linha-card">
              {genero.livros.length > 0 ? (
                genero.livros.map((livro) => (
                  <img
                    className="livro-card"
                    key={livro.id}
                    src={livro.caminhoImagem}
                    alt={livro.titulo}
                  />
                ))
              ) : (
                <p>Nenhum livro disponível neste gênero.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Carregando livros...</p>
      )}
    </div>
  );
}

export default Linha;