import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import api from "../../services/api";
import { useCallback } from "react";
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
  handleLikeComentario,
  likesComentarios,
  setLikesComentarios,
  idUser,
  deleteResenha,
}) => {
  const [listaComentarios, setListaComentarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [likesResenha, setLikesResenha] = useState(0);
  const [QtdcomentariosResenha, setQtdComentariosResenha] = useState(0);

  const [showEditResenhaModal, setShowEditResenhaModal] = useState(false);
  const [resenhaEditada, setResenhaEditada] = useState(res.textoResenha);

  useEffect(() => {
    const fetchResenhaData = async () => {
      try {
        const [likesData, comentariosData] = await Promise.all([
          api.LikeResenhaByResenha(res.id),
          buscarComentarios(res.id),
        ]);

        setLikesResenha(likesData.length);
        setQtdComentariosResenha(comentariosData.length);
      } catch (error) {
        console.error("Erro ao buscar dados da resenha:", error);
      }
    };

    fetchResenhaData();
  }, [res.id, buscarComentarios]);

  const handleShow = async () => {
    setShowModal(true);
    try {
      const comentariosBuscados = await buscarComentarios(res.id);
      setListaComentarios(comentariosBuscados);

      const likesResultados = await Promise.all(
        comentariosBuscados.map(async (comentario) => ({
          id: comentario.id,
          likes: (await api.LikeComentarioByComentario(comentario.id)).length,
        }))
      );

      const likesMap = likesResultados.reduce((acc, cur) => {
        acc[cur.id] = cur.likes;
        return acc;
      }, {});

      setLikesComentarios(likesMap);
    } catch (error) {
      console.error("Erro ao carregar comentários ou likes:", error);
    }
  };

  const handleClose = () => setShowModal(false);

  const handleShowEditResenhaModal = () => {
    setResenhaEditada(res.textoResenha);
    setShowEditResenhaModal(true);
  };

  const handleCloseEditResenhaModal = () => setShowEditResenhaModal(false);

  const handleEnviarComentario = useCallback(async () => {
    await enviarComentario(res.id);
    const comentariosAtualizados = await buscarComentarios(res.id);
    setListaComentarios(comentariosAtualizados);
  }, [res.id, enviarComentario, buscarComentarios]);

  const atualizarLikesResenha = useCallback(async () => {
    try {
      const data = await api.LikeResenhaByResenha(res.id);
      setLikesResenha(data.length);
    } catch (error) {
      console.error("Erro ao atualizar likes da resenha:", error);
    }
  }, [res.id]);

  const deleteComentario = async (idComentario) => {
    try {
      // Chamada à API para excluir o comentário
      await api.DeleteComentario(idComentario);

      // Remove o comentário excluído do estado local
      setListaComentarios((prev) =>
        Array.isArray(prev) ? prev.filter((c) => c.id !== idComentario) : []
      );

      // Atualiza a contagem de comentários
      setQtdComentariosResenha((prev) => prev - 1);

      // Se quiser exibir mensagens, você pode usar alert ou outro state (opcional):
      // alert("Comentário excluído com sucesso!");
    } catch (error) {
      console.error(
        "Erro ao excluir o comentário:",
        error.response?.data || error
      );
      // alert("Erro ao excluir o comentário. Tente novamente.");
    }
  };

  const handleAtualizarResenha = async () => {
    try {
      const payload = {
        idLivro: res.idLivro,
        idUser: res.idUser,
        textoResenha: resenhaEditada,
      };
  
      await api.putResenha(res.id, payload);
  
      setShowEditResenhaModal(false);
    } catch (error) {
      console.error("Erro ao atualizar a resenha:", error);
      alert("Erro ao atualizar a resenha. Tente novamente.");
    }
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
                <i
                  className="bi bi-heart"
                  onClick={() =>
                    handleLikeResenha(res.id).then(() =>
                      atualizarLikesResenha()
                    )
                  }
                ></i>
                <span>{likesResenha}</span>
                <i className="bi bi-chat" onClick={handleShow}></i>
                <span>{QtdcomentariosResenha}</span>
              </div>
              <div className="icones-direita">
                {idUser === res.idUser && (
                  <>
                    <i
                      className="bi bi-pencil icone-editar-resenha"
                      onClick={handleShowEditResenhaModal}
                    />

                    <i
                      className="bi bi-trash icone-excluir-resenha"
                      onClick={() => deleteResenha(res.id)}
                    ></i>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </li>

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
        className="resenha-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-resenha">
            <i className="bi bi-person-circle fs-3"></i>
            <strong>{res.email}</strong>
            <span className="texto-resenha">{res.textoResenha}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-comentarios">
          {listaComentarios.length > 0 ? (
            <ul>
              {listaComentarios.map((comentario) => (
                <li key={comentario.id} className="lista-comentarios">
                  <div className="comentario-conteudo">
                    <i className="bi bi-person-circle"></i>
                    <strong>{comentario.emailUsuario}</strong>{" "}
                    {comentario.textoComent}
                  </div>
                  <div className="like-container">
                    <i
                      className="bi bi-heart icone-like"
                      onClick={() => handleLikeComentario(comentario.id)}
                    ></i>
                    <span>{likesComentarios[comentario.id] || 0}</span>
                    <div className="icones-direita">
                      {idUser === comentario.idUser && (
                        <i
                          className="bi bi-trash icone-excluir-comentario"
                          onClick={() => deleteComentario(comentario.id)}
                        ></i>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum comentário encontrado.</p>
          )}
        </Modal.Body>

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
          {resenhaSelecionada === res.id ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEnviarComentario}
              >
                Enviar Comentário
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleComentar(null)}
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
              {resenhaSelecionada ? "Cancelar" : "Comentar"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditResenhaModal}
        onHide={handleCloseEditResenhaModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Resenha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Resenha atual:</strong>
          </p>
          <p>{res.textoResenha}</p>
          <TextField
            label="Nova resenha"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            value={resenhaEditada}
            onChange={(e) => setResenhaEditada(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditResenhaModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAtualizarResenha}>
            Atualizar Resenha
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResenhaItem;
