import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MinhaBiblioteca.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Linha() {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const idUser = localStorage.getItem("Id");
      if (!idUser) {
        setError("Usuário não encontrado.");
        return;
      }
  
      try {
        const livros = await api.BibliotecaByUser(idUser);
        setLivros(livros);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        console.error(err);
      }
    };
  
    fetchData();
  }, []);

  const handleImageClick = (livro) => {
    navigate(`/Livro/${livro.livros.id}`);
  };

  return (
    <div className="biblioteca-container">
      {error && <p className="error">{error}</p>}
      {livros.length > 0 ? (
        <div className="biblioteca-livros-container">
          {livros.map((livro) => (
            <img
              className="biblioteca-livro-card"
              key={livro.livros.id}
              src={livro.livros.caminhoImagem}
              alt={livro.livros.titulo}
              onClick={() => handleImageClick(livro)}
            />
          ))}
        </div>
      ) : (
        <button className="btn btn-load" type="button" disabled>
          <span
            className="biblioteca-spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Carregando os livros...
        </button>
      )}
    </div>
  );
}
