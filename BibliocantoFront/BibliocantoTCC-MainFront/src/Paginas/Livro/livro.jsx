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
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState({});
  const [resenhaSelecionada, setResenhaSelecionada] = useState(null);
  const [idResenha, setResenhaId] = useState(null);
  const [listaComentarios, setListaComentarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Busca o e-mail do usuário logado
      const usuarioLogado = localStorage.getItem("email");
      if (usuarioLogado) {
        setEmail(usuarioLogado);

        // Busca o ID do usuário com base no e-mail
        try {
          const response = await api.get(
            `/api/Account/IdUserByEmail?email=${usuarioLogado}`
          );
          console.log("Resposta da API:", response.data); // Debugando a resposta

          // Pega diretamente o ID do usuário, pois a resposta é um objeto
          setIdUser(response.data.id);
        } catch (error) {
          console.error("Erro ao buscar o ID do usuário:", error);
        }
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
          console.log("Resenhas recebidas:", response);
          setResenhas(response);

          // Verifica se o usuário já fez uma resenha
        if (response.some((res) => res.idUser === idUser)) {
          setMensagem("Você já enviou uma resenha para este livro.");
          }
        } catch (error) {
          console.error(
            "Erro ao buscar as resenhas:",
            error.response?.data || error.message
          );
        }
      }
    };

    fetchData();
  }, [idLivro, idUser]);

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

  // Seleciona a Resenha para comentar
  const handleComentar = async (idResenha) => {
    setResenhaSelecionada((prev) => (prev === idResenha ? null : idResenha));
  
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
    const textoComent = comentarios[idResenha]?.trim();
    if (!textoComent) {
      alert("O comentário não pode estar vazio.");
      return;
    }

    try {
      const comentarioData = {
        idResenha: idResenha, // O ID da resenha já foi buscado e armazenado
        idUser: idUser,
        textoComent: textoComent,
      };

      // Chama a função CadastrarComentario da API
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
      console.log('Comentários retornados da API:', comentariosBuscados);
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
        {/* Coluna para exibir a imagem do livro xs={12} md={8}*/}
        <Col xs={12} md={4} className="livro-coluna">
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
  console.log("Resenha atual:", res); // Adicione isso
  return (
    <ResenhaItem
                        key={`resenha-${res.id}`}
                        res={res}
                        handleComentar={handleComentar}
                        resenhaSelecionada={resenhaSelecionada}
                        email={email}
                        setComentarios={setComentarios}
                        comentarios={comentarios}
                        enviarComentario={enviarComentario}
                        buscarComentarios={buscarComentarios}
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
      </Row>
    </Container>
  );
}
export default Livro;
