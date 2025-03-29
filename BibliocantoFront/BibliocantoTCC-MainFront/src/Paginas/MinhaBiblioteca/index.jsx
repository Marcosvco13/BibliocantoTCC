import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import "./MinhaBiblioteca.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Linha() {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredLivro, setHoveredLivro] = useState(null);

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

      <h1 className="titulo-biblioteca">Minha Biblioteca</h1>

      {error && <p className="error">{error}</p>}
      {livros.length > 0 ? (
        <div className="biblioteca-livros-container">
                  {livros.map((livro) => (
                    <div
                      key={livro.id}
                      className="biblioteca-livro-wrapper"
                      onMouseEnter={() => setHoveredLivro(livro.id)}
                      onMouseLeave={() => setHoveredLivro(null)}
                    >
                      <img
                        className={`biblioteca-livro-card ${hoveredLivro === livro.id ? "hover" : ""}`}
                        key={livro.livros.id}
                        src={livro.livros.caminhoImagem}
                        alt={livro.livros.titulo}
                        onClick={() => handleImageClick(livro)}
                      />
                      {hoveredLivro === livro.id && (
                        <div className="biblioteca-livro-overlay">
                          <p>{livro.livros.descricao}</p>
                          
                            <div className="biblioteca-livro-actions">
                              {livro.livros.linkCompra && (
                                <button
                                  className="biblioteca-btnIcon"
                                  onClick={() => window.open(livro.livros.linkCompra, "_blank")}
                                  title="Comprar Livro"
                                >
                                  <FontAwesomeIcon icon={faCartShopping} />
                                </button>
                              )}
                              <button className="biblioteca-btnIcon" onClick={() => handleAddMeuLivro(livro)} title="Remover da Biblioteca">
                                <i className="bi bi-bookmark-x"></i>
                              </button>
                            </div>
                          
                        </div>
                      )}
                    </div>
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
