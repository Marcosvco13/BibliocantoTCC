import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

function Inicio() {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // visibilidade do modal
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [autores, setAutores] = useState([]); // Armazena os autores
  const [generos, setGeneros] = useState([]); // Armazena os gêneros
  const [email] = useState(localStorage.getItem("email") || null);

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

  const handleImageClick = async (livro) => {
    setSelectedLivro(livro); // armazena qual livro clicou
    setModalVisible(true); // abre o modal

    try {
      // Busca os autores relacionados ao livro
      const autorLivros = await api.buscarAutoresPorLivro(livro.id);
      const autoresDetalhados = await Promise.all(
        autorLivros.map(async (autorLivro) => {
          const autor = await api.buscarAutorPorId(autorLivro.idAutor);
          return autor.nomeAutor; // Retorna apenas o nome do autor
        })
      );
      setAutores(autoresDetalhados); // Armazena os nomes dos autores

      // Busca os gêneros relacionados ao livro
      const generoLivros = await api.buscarGenerosPorLivro(livro.id);
      const generosDetalhados = await Promise.all(
        generoLivros.map(async (generoLivro) => {
          const genero = await api.buscarGeneroPorId(generoLivro.idGenero);
          return genero.nomegenero; // Retorna o nome do gênero
        })
      );
      setGeneros(generosDetalhados); // Armazena os nomes dos gêneros
    } catch (err) {
      setError("Erro ao carregar autores ou gêneros.");
      console.error(err);
    }
  };

  const navigate = useNavigate(); // Hook para navegação

  const handleEditClick = () => {
    if (selectedLivro) {
      navigate(`/EditarLivro/${selectedLivro.id}`); // Redireciona para a página de edição do livro selecionado
    }
  };

  const handleAddMeuLivro = async () => {
    const idUser = localStorage.getItem("Id");

    if (!idUser) {
      alert("Usuário não encontrado");
      return;
    }

    if (selectedLivro) {
      const idLivro = selectedLivro.id;

      const data = { idUser, idLivro };

      try {
        const response = await api.post("/api/MeusLivros", data);
        console.log(response);
        alert("Livro adicionado com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Falha ao salvar livro na biblioteca!: " + error.message);
      }
    } else {
      alert("Nenhum livro selecionado");
    }
  };

  return (
    <div className="linha-container">
      {error && <p className="error">{error}</p>}
      {livros.length > 0 ? (
        <div className="livros-container">
          {livros.map((livro) => (
            <img
              className="livro-card"
              key={livro.id}
              src={livro.caminhoImagem}
              alt={livro.titulo}
              onClick={() => handleImageClick(livro)}
            />
          ))}
        </div>
      ) : (
        <button className="btn btn-load" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Carregando os livros...
        </button>
      )}
      {/* Popup Modal */}
      <Modal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            {selectedLivro ? selectedLivro.titulo : "Livro"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={
                    selectedLivro && selectedLivro.caminhoImagem
                      ? selectedLivro.caminhoImagem
                      : "src/assets/No Image.png"
                  }
                  alt={selectedLivro ? selectedLivro.titulo : "Imagem do livro"}
                  style={{ width: "100%" }}
                />
              </div>

              <div className="col-md">
                <div className="modal-text-1">
                  {selectedLivro
                    ? selectedLivro.descricao
                    : "Descrição do livro"}
                </div>
                <div className="modal-text-2">
                  Autor(es):{" "}
                  {autores.length > 0 ? autores.join(", ") : "Autor do livro"}
                </div>
                <div className="modal-text-3">
                  Gênero(s):{" "}
                  {generos.length > 0 ? generos.join(", ") : "Gênero do livro"}
                </div>
                <div className="modal-text-4">
                  Editora:{" "}
                  {selectedLivro?.editoras?.nomeEditora || "Editora do livro"}
                </div>
                <div className="modal-text-5">
                  ISBN: {selectedLivro ? selectedLivro.isbn : "ISBN"}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        {email && (
          <Modal.Footer>
            {email && (
              <>
                <button
                  className="btnIcon"
                  onClick={handleEditClick} // Função para editar
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                {selectedLivro?.linkCompra && (
              <button
                className="btnIcon"
                onClick={() => window.open(selectedLivro.linkCompra, "_blank")}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            )}
                <button
                  className="btnIcon"
                  onClick={handleAddMeuLivro}
                >
                  <i className="bi bi-bookmark-plus"></i>
                </button>
              </>
            )}
            
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default Inicio;
