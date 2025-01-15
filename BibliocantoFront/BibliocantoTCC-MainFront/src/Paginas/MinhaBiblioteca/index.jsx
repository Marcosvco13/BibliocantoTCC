import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import api from "../../services/api";
import "./style.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function Linha() {
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // visibilidade do modal
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [meuLivro, setMeuLivroClick] = useState(null);
  const [email] = useState(localStorage.getItem("email") || null);

  useEffect(() => {
    const fetchData = async () => {
      const idUser = localStorage.getItem("Id");
      if (!idUser) {
        setError("Usuário não encontrado.");
        return;
      }

      try {
        const response = await api.get(`api/MeusLivros/BibliotecaByUser?idUser=${idUser}`);

        setLivros(response.data);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (livro) => {
    setSelectedLivro(livro.livros); // armazena qual livro clicou
    setMeuLivroClick(livro.id);
    setModalVisible(true); // abre o modal
  };

  const handleRemoverLivro = async () => {

    const idUser = localStorage.getItem("Id");
    const idMeuLivro = meuLivro;
    //const navigate = useNavigate();

    if (!idUser) {
      setError("Usuário não encontrado.");
      return;
    }

    if (!idMeuLivro) {
      setError("Livro não encontrado.");
      return;
    }

    try {
      const response = await api.delete(`api/MeusLivros/${idMeuLivro}`);

      if (response.status === 200) {
        alert("Livro removido da sua biblioteca.");
        setModalVisible(false)
        window.location.reload();
      } else if (response.status === 401) {
        setError("Não autorizado. Faça login novamente.");
      } else if (response.status === 404) {
        setError("Livro não encontrado.");
      } else {
        setError("Falha ao remover o livro. Tente novamente.");
      }

    } catch (err) {
      setError("Erro ao carregar os dados. Por favor, tente novamente.");
      console.error("Erro ao remover o livro:", err);
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
            className="spinner-border spinner-border-sm" role="status" aria-hidden="true"
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
                  src={selectedLivro ? selectedLivro.caminhoImagem : ""}
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
                  {selectedLivro?.autores?.nomeAutor || "Autor do livro"}
                </div>
                <div className="modal-text-3">
                  Gênero(s):{" "}
                  {selectedLivro?.generos?.nomegenero || "Gênero do livro"}
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
        <Modal.Footer>
                    {email && (
                      <>
                        <button
                          className="btnIcon"
                          onClick={handleRemoverLivro} // Função para adicionar o livro a biblioteca
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </>
                    )}

        </Modal.Footer>
      </Modal>
    </div>
  );
}