import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import api from "../../services/api";
import "./ResenhaItem.css";

const ResenhaItem = ({
  res,
  handleComentar,
  resenhaSelecionada,
  setComentarios,
  comentarios,
  enviarComentario,
  buscarComentarios,
  handleLikeResenha,
  likesResenha,
}) => {

  const [listaComentarios, setListaComentarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedResenha, setSelectedResenha] = useState(null);

  // Função para buscar comentários e abrir a modal
  const handleShow = async (resenha) => {
    setSelectedResenha(resenha);
    setShowModal(true);

    try {
      const comentariosBuscados = await buscarComentarios(resenha.id);
      console.log(
        `Comentários para resenha ${resenha.id}:`,
        comentariosBuscados
      );
      setListaComentarios(comentariosBuscados || []);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    }
  };

  // Fechar o modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedResenha(null);
  };

  return (
    <>
      <li key={`resenha-${res.id}`} className="resenha-item">
        <div className="comentario-container">
          <i className="bi bi-person-circle icone"></i>
          <div className="comentario-texto">
            <p className="email">{res.email || "Carregando..."}</p>
            <p className="resenha">{res.textoResenha}</p>
            <div className="comentario-acoes">
              <div className="icones-esquerda">
              <i className="bi bi-heart" onClick={handleLikeResenha}></i>
              <span>{likesResenha}</span>
                <i className="bi bi-chat"></i>
              </div>
              <i className="bi bi-arrow-up-right-square icone-direita" onClick={() => handleShow(res)}></i>
            </div>
          </div>
        </div>
      </li>

      {/* Modal de visualização da resenha */}
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
        className="resenha-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedResenha ? selectedResenha.textoResenha : "Resenha"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listaComentarios.length > 0 ? (
            <ul>
              {listaComentarios.map((comentario) => (
                <li key={comentario.id} className="lista-comentarios">
                  <i className="bi bi-person-circle fs-3"></i> {res.email}{" "}
                  {comentario.textoComent}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum comentário encontrado.</p>
          )}
        </Modal.Body>

        {/* Exibe a caixa de comentário apenas para a resenha selecionada */}
        {resenhaSelecionada === res.id && (
          <div className="comentario-box">
            <TextField
              label="Escreva um comentário"
              multiline
              fullWidth
              rows={2}
              variant="outlined"
              value={comentarios[res.id] || ""}
              onChange={(e) =>
                setComentarios((prev) => ({
                  ...prev,
                  [res.id]: e.target.value,
                }))
              }
              style={{ marginTop: "10px" }}
            />
          </div>
        )}
        <Modal.Footer>
          {/* Exibir o botão "Enviar Comentário" apenas se a caixa de comentário estiver aberta */}
          {resenhaSelecionada === res.id ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={async () => {
                  await enviarComentario(res.id);
                  const comentariosAtualizados = await buscarComentarios(
                    res.id
                  ); // Atualiza a lista após o envio
                  setListaComentarios(comentariosAtualizados || []);
                }}
              >
                Enviar Comentário
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleComentar(null)} // Cancela o comentário
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleComentar(res.id)}
            >
              Comentar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResenhaItem;
