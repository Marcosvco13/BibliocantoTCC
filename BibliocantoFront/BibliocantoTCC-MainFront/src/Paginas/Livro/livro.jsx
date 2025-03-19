import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./livro.css";
import ResenhaItem from "../../Componentes/Resenha/ResenhaItem";
import { Box, Rating } from "@mui/material";

function Livro() {
  const { id: idLivro } = useParams();
  const [livro, setLivro] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [resenha, setResenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [resenhas, setResenhas] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [comentarios, setComentarios] = useState({});
  const [resenhaSelecionada, setResenhaSelecionada] = useState(null);
  const [idResenha, setResenhaId] = useState(null);
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [mostrarEnviarResenha, setMostrarEnviarResenha] = useState(false);
  const [likesComentarios, setLikesComentarios] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca o id do usuário logado
        const usuarioLogado = localStorage.getItem("Id");
        if (usuarioLogado) {
          setIdUser(usuarioLogado);
        }
  
        // Aguarda `idUser` e `idLivro` estarem disponíveis
        if (!usuarioLogado || !idLivro) return;
  
        // Busca resenhas do livro
        try {
          const response = await api.getResenhaByIdLivro(idLivro);
          setResenhas(response);
          //console.log("Resposta da API:", response);
  
          // Verifica se o usuário já fez uma resenha
          if (response.some((res) => res.idUser === usuarioLogado)) {
            setMensagem("Você já enviou uma resenha para este livro.");
          }
  
          // Adiciona o email do usuário que escreveu a resenha
          const resenhasComEmail = await Promise.all(
            response.map(async (res) => {
              const usuario = await api.EmailUserByID(res.idUser);
              return { ...res, email: usuario.email };
            })
          );
          setResenhas(resenhasComEmail);
        } catch (error) {
          console.error("Erro ao buscar as resenhas:", error.response?.data || error.message);
        }
  
        // Busca os dados do livro
        try {
          const data = await api.getLivroById(idLivro);
          setLivro(data);
  
          // Busca os autores relacionados ao livro
          const autorLivros = await api.buscarAutoresPorLivro(data.id);
          const autoresDetalhados = await Promise.all(
            autorLivros.map(async (autorLivro) => {
              const autor = await api.buscarAutorPorId(autorLivro.idAutor);
              return autor.nomeAutor;
            })
          );
          setAutores(autoresDetalhados);
  
          // Busca os gêneros relacionados ao livro
          const generoLivros = await api.buscarGenerosPorLivro(data.id);
          const generosDetalhados = await Promise.all(
            generoLivros.map(async (generoLivro) => {
              const genero = await api.buscarGeneroPorId(generoLivro.idGenero);
              return genero.nomegenero;
            })
          );
          setGeneros(generosDetalhados);
        } catch (error) {
          console.error("Erro ao buscar dados do livro:", error.response?.data || error.message);
        }
  
        // Busca a avaliação do usuário para o livro
        try {
          const avaliacaoExistente = await api.AvaliacaoByUserLivro(idLivro, usuarioLogado);
          setRatingValue(avaliacaoExistente?.estrelas ?? 0);
          //console.log("Avaliação carregada:", avaliacaoExistente?.estrelas);
        } catch (error) {
          console.error("Erro ao buscar avaliação:", error.response?.data || error.message);
        }
        
    } catch (error) {
      console.error("Erro geral no fetchData:", error);
    }
  };

  fetchData();
}, [idLivro]);

  // Função para enviar uma nova resenha
  const enviarResenha = async () => {
    if (!idUser) {
      setMensagem("Erro: usuário não identificado.");
      return;
    }

    if (!resenha.trim()) {
      setMensagem("A resenha não pode estar vazia.");
      return;
    }

    // Verifica se o usuário já enviou uma resenha
    const resenhaExistente = resenhas.find((res) => res.idUser === idUser);
    if (resenhaExistente) {
      setMensagem("Você já enviou uma resenha para este livro.");
      return;
    }

    try {
      const resenhaData = {
        idLivro: idLivro,
        idUser: idUser,
        textoResenha: resenha,
      };

      // Chamada à função cadastrarResenha da API
      await api.cadastrarResenha(resenhaData);

      setMensagem("Resenha enviada com sucesso!");
      setResenha(""); // Limpa o campo de resenha
      setMostrarEnviarResenha(false);
    } catch (error) {
      console.error("Erro ao enviar a resenha:", error.response?.data || error);
      setMensagem("Erro ao enviar a resenha. Tente novamente.");
    }
  };

  const handleLikeResenha = async (idResenha) => {
    try {
      // Verifica se o usuário já curtiu a resenha
      let likeExistente;
      try {
        likeExistente = await api.LikeResenhaByUserResenha(idUser, idResenha);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          likeExistente = null;
        } else {
          console.error("Erro ao verificar o like da resenha:", error);
          return;
        }
      }

      if (likeExistente) {
        // Se o like já existir, exclui o like
        await api.DeleteLikeResenha(likeExistente.id);
      } else {
        // Se o like não existir, adiciona o like
        const likeDataResenha = {
          idResenha,
          idUser,
          like: 1,
        };

        await api.cadastrarLikeResenha(likeDataResenha);
      }
    } catch (error) {
      console.error("Erro ao processar o like na resenha:", error);
    }
  };

  const handleLikeComentario = async (idComentario) => {
    try {
      // Verifica se o usuário já curtiu o comentário
      let likeComentarioExistente;
      try {
        likeComentarioExistente = await api.LikeComentarioByUserComentario(
          idUser,
          idComentario
        );
      } catch (error) {
        if (error.response && error.response.status === 404) {
          likeComentarioExistente = null;
        } else {
          console.error("Erro ao verificar o like do comentário:", error);
          return;
        }
      }

      if (likeComentarioExistente) {
        // Se o like já existir, exclui o like
        await api.DeleteLikeComentario(likeComentarioExistente.id);
      } else {
        // Se o like não existir, adiciona o like
        const likeDataComentario = {
          idComentario: idComentario,
          idUser: idUser,
          like: 1,
        };

        await api.cadastrarLikeComentario(likeDataComentario);
      }

      // Atualiza a quantidade de likes do comentário específico
      const likesAtualizados = await api.LikeComentarioByComentario(
        idComentario
      );

      // Atualiza o estado dos likes apenas para o comentário alterado
      setLikesComentarios((prev) => ({
        ...prev,
        [idComentario]: likesAtualizados.length,
      }));
    } catch (error) {
      console.error("Erro ao processar o like no comentário:", error);
    }
  };

  // Seleciona a Resenha para comentar
  const handleComentar = (idResenha) => {
    setResenhaSelecionada((prev) => (prev === idResenha ? null : idResenha));

    setComentarios((prev) => ({
      ...prev,
      [idResenha]: prev[idResenha] || "", // Garante que exista uma chave para o idResenha
    }));

    setResenhaId(idResenha); // Apenas define o ID da resenha selecionada
  };

  // Envia um comentário para a API
  const enviarComentario = async () => {
    if (!idResenha) {
      alert("Erro: ID da resenha não encontrado.");
      return;
    }

    const textoComent = comentarios[idResenha]?.trim();

    if (!textoComent) {
      alert("O comentário não pode estar vazio.");
      return;
    }

    try {
      const comentarioData = {
        idResenha: idResenha,
        idUser: idUser,
        textoComent: textoComent,
      };

      await api.CadastrarComentario(comentarioData);
      alert("Comentário enviado com sucesso!");
      setComentarios((prev) => ({ ...prev, [idResenha]: "" })); // Limpa o campo após envio
    } catch (error) {
      console.error(
        "Erro ao enviar comentário:",
        error.response?.data || error
      );
      alert("Erro ao enviar o comentário. Tente novamente.");
    }
  };

  const buscarComentarios = async (idResenha) => {
    try {
      const comentariosBuscados = await api.ComentarioByResenha(idResenha);

      // Para cada comentário, buscar o email do usuário pelo idUser
      const comentariosComEmail = await Promise.all(
        comentariosBuscados.map(async (comentario) => {
          try {
            const usuario = await api.EmailUserByID(comentario.idUser); // Buscar o email do usuário
            return {
              ...comentario,
              emailUsuario: usuario.email, // Adicionar o email ao comentário
            };
          } catch (error) {
            console.error(
              "Erro ao buscar o email do usuário para o comentário:",
              error
            );
            return comentario; // Caso falhe, retorna o comentário sem o email
          }
        })
      );

      // Retorna os comentários com o email adicionado
      return comentariosComEmail;
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      return []; // Retorna um array vazio em caso de erro para evitar `undefined`
    }
  };

  // Função para enviar ou atualizar a avaliação do usuário
const enviarAvaliacao = async (estrelas) => {
  if (!idUser) {
    alert("É necessário estar logado para avaliar.");
    return;
  }

  try {

    // Se estrelas for null ou undefined, exibir erro
    if (estrelas == null || isNaN(estrelas)) {
      console.error("Erro: Número de estrelas inválido!", estrelas);
      alert("Erro ao processar a avaliação. Número de estrelas inválido.");
      return;
    }

    // Verifica se o usuário já avaliou o livro
    const avaliacaoExistente = await api.AvaliacaoByUserLivro(idLivro, idUser);

    if (avaliacaoExistente && avaliacaoExistente.id) {
      // Se já existe avaliação, faz um PUT para atualizar
      const idAvaliacao = avaliacaoExistente.id;

      // Garante que o novo objeto tenha o ID correto e o novo número de estrelas
      const DataAvaliacaoLivro = {
        idLivro: avaliacaoExistente.idLivro,
        idUser: avaliacaoExistente.idUser, 
        estrelas: parseInt(estrelas) 
      };

      await api.PutAvaliacao(idAvaliacao, DataAvaliacaoLivro);

      alert("Avaliação atualizada com sucesso!");
    } else {
      // Se não existe avaliação, faz um POST para criar

      const DataAvaliacaoLivro = {
        idLivro: idLivro,
        idUser: idUser,
        estrelas: parseInt(estrelas)
      };

      await api.AvaliarLivro(DataAvaliacaoLivro);

      alert("Avaliação enviada com sucesso!");
    }
  } catch (error) {
    alert("Erro ao enviar a avaliação. Tente novamente.");
  }
};


  return (
    <Container>
      <Row>
        <Col xs={12} md={3} className="livro-coluna">
          {livro ? (
            <>
              <div>
                <img
                  className="livro-imagem"
                  src={livro.caminhoImagem}
                  alt={livro.titulo}
                />
              </div>

              <div className="div-info">
                <p>ISBN-13: {livro.isbn}</p>

                {livro && livro.editoras ? (
                  <p>Editora: {livro.editoras.nomeEditora}</p>
                ) : (
                  <p>Carregando editora...</p>
                )}

                {autores.length > 0 ? (
                  <p>Autor(es): {autores.join(", ")}</p>
                ) : (
                  <p>Carregando autores...</p>
                )}

                {generos.length > 0 ? (
                  <p>Gênero(s): {generos.join(", ")}</p>
                ) : (
                  <p>Carregando gêneros...</p>
                )}

                <Button
                  variant="contained"
                  onClick={() => setMostrarEnviarResenha(true)}
                >
                  Escrever Resenha
                </Button>

                {/* Classificação do usuário */}
            {idUser && (
              <Box mt={2}>
                <Rating
                  name="user-rating"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                    enviarAvaliacao(newValue);
                  }}
                />
              </Box>
            )}

                <div className="icones-acoes-livro">
                  {livro?.linkCompra && (
                    <button
                      className="biblioteca-btnIcon"
                      onClick={() => window.open(livro.linkCompra, "_blank")}
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </Col>

        <Col xs={12} md={6} className="livro-coluna-texto">
          {livro ? (
            <div>
              <div className="livro-info">
                <h1>{livro.titulo}</h1>
                <p>{livro.descricao}</p>
              </div>

              <div className="resenha-container">
                {mostrarEnviarResenha && (
                  <div className="escrever-resenha">
                    <TextField
                      label="Escreva sua resenha"
                      multiline
                      fullWidth
                      rows={4}
                      variant="outlined"
                      value={resenha}
                      onChange={(e) => setResenha(e.target.value)}
                      style={{ marginTop: "20px" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={enviarResenha}
                      style={{ marginTop: "10px" }}
                    >
                      Enviar Resenha
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setMostrarEnviarResenha(false)}
                      style={{ marginTop: "10px" }}
                    >
                      Cancelar Resenha
                    </Button>

                    {mensagem && (
                      <p style={{ marginTop: "10px", color: "red" }}>
                        {mensagem}
                      </p>
                    )}
                  </div>
                )}

                {/* Listagem de Resenhas */}
                <h3 style={{ marginTop: "20px" }}>Resenhas</h3>
                {Array.isArray(resenhas) && resenhas.length > 0 ? (
                  <ul className="lista-resenhas">
                    {resenhas.map((res) => {
                      return (
                        <ResenhaItem
                          key={`resenha-${res.id}`}
                          res={res}
                          handleComentar={handleComentar}
                          resenhaSelecionada={resenhaSelecionada}
                          setComentarios={setComentarios}
                          comentarios={comentarios}
                          enviarComentario={enviarComentario}
                          buscarComentarios={buscarComentarios}
                          handleLikeResenha={() => handleLikeResenha(res.id)}
                          handleLikeComentario={handleLikeComentario}
                          likesComentarios={likesComentarios}
                          setLikesComentarios={setLikesComentarios}
                        />
                      );
                    })}
                  </ul>
                ) : (
                  <p>Ainda não há resenhas para este livro.</p>
                )}
              </div>
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </Col>

        <Col xs={12} md={3} className="livro-coluna-extra">
          <p>
            Recomendações de livros do(a) mesmo(a) autor(a)
          </p>
        </Col>
      </Row>
    </Container>
  );
}
export default Livro;