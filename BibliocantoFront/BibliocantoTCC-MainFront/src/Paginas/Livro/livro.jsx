import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCartShopping,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

//css
import "./livro.css";

//componentes
import ResenhaItem from "../../Componentes/Resenha/ResenhaItem";

function Livro() {
  const { id: idLivro } = useParams();
  const [livro, setLivro] = useState(null);
  const [ratingValue, setRatingValue] = useState(2);
  const [resenha, setResenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [resenhas, setResenhas] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [comentarios, setComentarios] = useState({});
  const [resenhaSelecionada, setResenhaSelecionada] = useState(null);
  const [idResenha, setResenhaId] = useState(null);
  const [listaComentarios, setListaComentarios] = useState([]);
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Busca o id do usuário logado
      try {
        const usuarioLogado = localStorage.getItem("Id");

        if (usuarioLogado) {
          setIdUser(usuarioLogado);
        }
      } catch (error) {
        console.error("Erro ao buscar o ID do usuário:", error);
      }

      // Busca os dados do livro utilizando a API centralizada
      try {
        const data = await api.getLivroById(idLivro);
        setLivro(data);
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      }

      // Busca resenhas do livro
      if (idLivro) {
        try {
          const response = await api.getResenhaByIdLivro(idLivro);
          //console.log("Resenhas recebidas:", response);
          setResenhas(response);

          // Verifica se o usuário já fez uma resenha
          if (response.some((res) => res.idUser === idUser)) {
            setMensagem("Você já enviou uma resenha para este livro.");
          }

          // Adiciona o email do usuário que escreveu a resenha
          const resenhasComEmail = await Promise.all(
            response.map(async (res) => {
              const usuario = await api.EmailUserByID(res.idUser); // Busca o objeto do autor da resenha
              const email = usuario.email; // Acessa o email do usuário
              return { ...res, email }; // Retorna a resenha com o email adicionado
            })
          );

          //console.log("Resenhas com email:", resenhasComEmail);

          setResenhas(resenhasComEmail);
        } catch (error) {
          console.error(
            "Erro ao buscar as resenhas:",
            error.response?.data || error.message
          );
        }
      }

      try {
        // Busca os dados do livro
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
        console.error(
          "Erro ao buscar as resenhas:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, [idLivro]);

  // Função para enviar uma nova resenha
  const enviarResenha = async () => {
    console.log("ID do usuário:", idUser);
    console.log("ID do livro:", idLivro);
    console.log("Texto da resenha:", resenha);

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

      console.log("Enviando dados:", resenhaData);

      // Chamada à função cadastrarResenha da API
      await api.cadastrarResenha(resenhaData);

      setMensagem("Resenha enviada com sucesso!");
      setResenha(""); // Limpa o campo de resenha

      fetchResenhas(); // Atualiza a lista de resenhas após o envio
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
          console.log("Like não encontrado. Criando um novo.");
          likeExistente = null;
        } else {
          console.error("Erro ao verificar o like da resenha:", error);
          return;
        }
      }

      if (likeExistente) {
        // Se o like já existir, exclui o like
        await api.DeleteLikeResenha(likeExistente.id);
        console.log("Like removido da resenha:", idResenha);
      } else {
        // Se o like não existir, adiciona o like
        const likeDataResenha = {
          idResenha,
          idUser,
          like: 1,
        };

        await api.cadastrarLikeResenha(likeDataResenha);
        console.log("Like adicionado à resenha:", idResenha);
      }
    } catch (error) {
      console.error("Erro ao processar o like na resenha:", error);
    }
  };

  // Seleciona a Resenha para comentar
  const handleComentar = async (idResenha) => {
    setResenhaSelecionada((prev) => (prev === idResenha ? null : idResenha));

    setComentarios((prev) => ({
      ...prev,
      [idResenha]: prev[idResenha] || "", // Garante que exista uma chave para o idResenha
    }));

    if (!idUser || !idLivro) {
      alert("Erro: Usuário ou livro não identificado.");
      return;
    }

    try {
      // Buscando a resenha do usuário para o livro
      const resenha = await api.getResenhaByUserLivro(idUser, idLivro);

      // Verifica se a resenha retornada tem um ID
      if (resenha && resenha.id) {
        console.log("Resenha encontrada:", resenha); // Log para verificar a resenha encontrada
        setResenhaId(resenha.id); // Armazena o ID da resenha encontrada
      } else {
        console.error("Resenha não encontrada ou sem ID:", resenha);
      }
    } catch (error) {
      console.error("Erro ao buscar a resenha:", error);
    }
  };

  // Envia um comentário para a API
  const enviarComentario = async () => {
    if (!idResenha) {
      alert("Erro: ID da resenha não encontrado.");
      return;
    }

    const textoComent = comentarios[idResenha]?.trim();
    console.log("Texto do comentário:", textoComent);

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
      console.log("Comentários retornados da API:", comentariosBuscados);
      return comentariosBuscados; // Certifique-se de retornar os comentários aqui
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      return []; // Retorna um array vazio em caso de erro para evitar `undefined`
    }
  };

  return (
    <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        {/* Coluna para exibir a imagem do livro xs={12} md={3}*/}
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

                <Box
                  component="fieldset"
                  mb={3}
                  borderColor="transparent"
                  className="box-avaliacao"
                >
                  <div className="rating-container">
                    <Rating
                      name="simple-controlled"
                      value={ratingValue}
                      onChange={(event, newValue) => {
                        setRatingValue(newValue);
                      }}
                    />
                  </div>
                </Box>

                {livro?.linkCompra && (
                  <button
                    className="biblioteca-btnIcon"
                    onClick={() => window.open(livro.linkCompra, "_blank")}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                )}
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
                {mensagem && (
                  <p style={{ marginTop: "10px", color: "red" }}>{mensagem}</p>
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
            Aqui você pode adicionar mais informações ou funcionalidades
            futuramente.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
export default Livro;
