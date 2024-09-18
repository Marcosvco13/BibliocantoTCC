import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

function Linha() {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState(null);
  const [email] = useState(localStorage.getItem('email') || null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.getLivros(setLivros);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="linha-container">
      <div className="linha-crear">
        {email && (
          <>
            <span>
              <Link to="/CadastrarLivro">Cadastrar Livro</Link>
            </span>
            <hr style={{ color: 'white' }} />
          </>
        )}
      </div>

      {error && <p className="error">{error}</p>}
      {livros.length > 0 ? (
        <div className="livros-container">
          {livros.map((livro) => (
            <img
              className="livro-card"
              key={livro.id}
              src={livro.caminhoImagem}
              alt={livro.titulo}
            />
          ))}
        </div>
      ) : (
        <p>Carregando livros...</p>
      )}
    </div>
  );
}

export default Linha;
