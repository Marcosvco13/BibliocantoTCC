import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Linha.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Linha() {
  const [livros, setLivros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // visibilidade do modal
  const [selectedLivro, setSelectedLivro] = useState(null); // armazenar o livro selecionado
  const [email] = useState(localStorage.getItem("email") || null);

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
      livros: livros.filter(
        (livro) => livro.generos.nomegenero === genero.nomegenero
      ),
    };
  });

  // função para clicar na imagem e abrir o modal
  const handleImageClick = (livro) => {
    setSelectedLivro(livro); // armazena qual livro clicou
    setModalVisible(true); // abre o modal
  };

  const navigate = useNavigate(); // Hook para navegação

  const handleEditClick = () => {
    if (selectedLivro) {
      navigate(`/EditarLivro/${selectedLivro.id}`); // Redireciona para a página de edição do livro selecionado
    }
  };

  return (
    <div className="linha-container">
      <div className="linha-crear">
        {email && (
          <>
            <span>
              <Link to="/CadastrarLivro">Cadastrar Livro</Link>
            </span>
            <hr className="hrLinha" style={{ color: "white" }} />
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
                    onClick={() => handleImageClick(livro)} // abrir o popup modal
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

      {/* Popup Modal */}
      <Modal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
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
                <div className="modal-text">
                  {selectedLivro
                    ? selectedLivro.descricao
                    : "Descrição do livro"}
                </div>
                <div className="modal-text">
                  Autor: {selectedLivro?.autores?.nomeAutor || "Autor do livro"}
                </div>
                <div className="modal-text">
                  Gênero:{" "}
                  {selectedLivro?.generos?.nomegenero || "Gênero do livro"}
                </div>
                <div className="modal-text">
                  Editora:{" "}
                  {selectedLivro?.editoras?.nomeEditora || "Editora do livro"}
                </div>
                <div className="modal-text">
                  ISBN: {selectedLivro ? selectedLivro.isbn : "ISBN"}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        {email && (
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleEditClick} // Usa a função para navegação
            >
              Editar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default Linha;
