import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import "./style.css";

function Inicio() {
  const [livros, setLivros] = useState([]);
  const [livrosBiblioteca, setLivrosBiblioteca] = useState([]);
  const [error, setError] = useState(null);
  const [email] = useState(localStorage.getItem("email") || null);
  const [hoveredLivro, setHoveredLivro] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      const idUser = localStorage.getItem("Id");
      if (!idUser) {
        setError("Usuário não encontrado.");
        return;
      }

      try {
        const LivrosBiblioteca = await api.BibliotecaByUser(idUser);
        setLivrosBiblioteca(LivrosBiblioteca);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        console.error(err);
      }
    };

    fetchData();
  }, [livrosBiblioteca]);

  const handleAddMeuLivro = async (livro) => {
    const idUser = localStorage.getItem("Id");

    if (!idUser) {
      alert("Usuário não encontrado");
      return;
    }

    const idLivro = livro.id;

    try {
      const data = { idUser, idLivro };
      await api.post("/api/MeusLivros", data);
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      alert("Falha ao salvar livro na biblioteca!: " + error.message);
    }
  };

  // Função para verificar se o livro já está na biblioteca
  const isLivroNaBiblioteca = (livroId) => {
    return livrosBiblioteca.some((livro) => livro.livros.id === livroId);
  };

  return (
    <div className="inicio-linha-container">
      <h1 className="titulo-inicio">Acervo de Livros</h1>

      {error && <p className="error">{error}</p>}
      {livros.length > 0 ? (
        <div className="inicio-livros-container">
          {livros.map((livro) => (
            <div
              key={livro.id}
              className="inicio-livro-wrapper"
              onMouseEnter={() => setHoveredLivro(livro.id)}
              onMouseLeave={() => setHoveredLivro(null)}
            >
              <img
                className={`inicio-livro-card ${
                  hoveredLivro === livro.id ? "hover" : ""
                }`}
                src={livro.caminhoImagem}
                alt={livro.titulo}
                onClick={() => navigate(`/Livro/${livro.id}`)}
              />
              {hoveredLivro === livro.id && (
                <div className="inicio-livro-overlay">
                  <p>{livro.descricao}</p>
                  <div className="inicio-livro-actions">
                    {livro.linkCompra && (
                      <button
                        className="inicio-btnIcon"
                        onClick={() => window.open(livro.linkCompra, "_blank")}
                        title="Comprar livro"
                      >
                        <FontAwesomeIcon icon={faCartShopping} />
                      </button>
                    )}

                    {email &&
                      (!isLivroNaBiblioteca(livro.id) ? (
                        <button
                          className="inicio-btnIcon"
                          onClick={() => handleAddMeuLivro(livro)}
                          title="Adicionar à Biblioteca"
                        >
                          <i className="bi bi-bookmark-plus"></i>
                        </button>
                      ) : (
                        <button
                          className="inicio-btnIcon"
                          onClick={() => handleRemoveMeuLivro(livro)}
                          title="Remover da Biblioteca"
                        >
                          <i className="bi bi-bookmark-x"></i>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <button className="btn btn-load" type="button" disabled>
          <span
            className="inicio-container spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Carregando os livros...
        </button>
      )}
    </div>
  );
}

export default Inicio;
