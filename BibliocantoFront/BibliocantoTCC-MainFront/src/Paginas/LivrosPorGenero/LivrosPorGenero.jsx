import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import BuscaLivro from "../../Componentes/BuscaLivro/BuscaLivro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./LivrosPorGenero.css";

const LivrosPorGenero = () => {
  const [generosComLivros, setGenerosComLivros] = useState([]);
  const [livrosBiblioteca, setLivrosBiblioteca] = useState([]);
  const [email] = useState(localStorage.getItem("email") || null);
  const [hoveredLivro, setHoveredLivro] = useState(null);
  const [idBiblioteca, setIdLivroBiblioteca] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const buscarGenerosELivros = async () => {
      try {
        const generos = await api.getGeneros();

        const dadosComLivros = await Promise.all(
          generos.map(async (genero) => {
            try {
              const vinculos = await api.getTodosLivrosByGenero(genero.id);

              const livrosDetalhados = await Promise.all(
                vinculos.map(async (vinculo) => {
                  try {
                    const livro = await api.getLivroById(vinculo.idLivro);
                    return livro;
                  } catch (erroLivro) {
                    console.error(
                      `Erro ao buscar livro ID ${vinculo.idLivro}:`,
                      erroLivro
                    );
                    return null;
                  }
                })
              );

              const livrosFiltrados = livrosDetalhados.filter(
                (livro) => livro !== null
              );

              return {
                ...genero,
                livros: livrosFiltrados,
              };
            } catch (erroGenero) {
              console.error(
                `Erro ao buscar livros para o gênero ${genero.nomegenero}:`,
                erroGenero
              );
              return {
                ...genero,
                livros: [],
              };
            }
          })
        );

        const generosValidos = dadosComLivros.filter(
          (g) => g.livros.length > 0
        );

        setGenerosComLivros(generosValidos);
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error);
      }
    };

    buscarGenerosELivros();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const idUser = localStorage.getItem("Id");

      try {
        const LivrosBiblioteca = await api.BibliotecaByUser(idUser);
        setLivrosBiblioteca(LivrosBiblioteca);
      } catch (err) {}
    };

    fetchData();
  }, [livrosBiblioteca]);

  // Função para verificar se o livro já está na biblioteca
  const isLivroNaBiblioteca = (livroId) => {
    return livrosBiblioteca.some((livro) => livro.livros.id === livroId);
  };

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

  //funcao para remover o livro da biblioteca do usuario
  const handleDeleteMeuLivro = async (idLivro) => {
    const idUser = localStorage.getItem("Id");

    try {
      // Buscar o ID do livro na biblioteca do usuário
      const livroBiblioteca = await api.GetMeuLivroByIdLivroIdUser(
        idUser,
        idLivro
      );

      const idBiblioteca = livroBiblioteca.id;
      setIdLivroBiblioteca(idBiblioteca);

      // Excluir o livro da biblioteca
      await api.DeleteMeuLivro(idBiblioteca);

      // Atualizar a lista removendo o livro excluído
      setLivrosBiblioteca((prevLivros) =>
        prevLivros.filter((livro) => livro.id !== idBiblioteca)
      );
    } catch (error) {
      console.error("Erro ao excluir o livro da biblioteca:", error);
      alert("Falha ao remover o livro da biblioteca.");
    }
  };

  return (
    <div className="container-generos">
      <BuscaLivro onResultado={(resultado) => {}} />

      {generosComLivros.map((genero) => (
        <div key={genero.id} className="genero-bloco">
          <h2>{genero.nomegenero}</h2>
          <div className="linha-livros">
            {genero.livros.map((livro) => (
              <div
                key={livro.id}
                className="livro-card"
                onMouseEnter={() => setHoveredLivro(livro.id)}
                onMouseLeave={() => setHoveredLivro(null)}
              >
                <img
                  src={livro.caminhoImagem}
                  alt={livro.titulo}
                  className={`LivrosPorGenero-livro-card ${
                    hoveredLivro === livro.id ? "hover" : ""
                  }`}
                  onClick={() => navigate(`/Livro/${livro.id}`)}
                />
                {hoveredLivro === livro.id && (
                  <div className="LivrosPorGenero-livro-overlay">
                    <p>{livro.descricao}</p>
                    <div className="LivrosPorGenero-livro-actions">
                      {livro.linkCompra && (
                        <button
                          className="LivrosPorGenero-btnIcon"
                          onClick={() =>
                            window.open(livro.linkCompra, "_blank")
                          }
                          title="Comprar livro"
                        >
                          <FontAwesomeIcon icon={faCartShopping} />
                        </button>
                      )}
                      {email &&
                        (!isLivroNaBiblioteca(livro.id) ? (
                          <button
                            className="LivrosPorGenero-btnIcon"
                            onClick={() => handleAddMeuLivro(livro)}
                            title="Adicionar à Biblioteca"
                          >
                            <i className="bi bi-bookmark-plus"></i>
                          </button>
                        ) : (
                          <button
                            className="LivrosPorGenero-btnIcon"
                            onClick={() => handleDeleteMeuLivro(livro.id)}
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
        </div>
      ))}
    </div>
  );
};

export default LivrosPorGenero;
