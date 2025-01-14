import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./livro.css";

function Livro() {
  const { id } = useParams(); // Captura o ID da URL
  const [livro, setLivro] = useState(null);
  const [ratingValue, setRatingValue] = useState(2); // Estado para o valor da avaliação
  const [editora, setEditora] = useState(null); // Estado para armazenar a editora

  // Busca os dados do livro
  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const response = await fetch(`http://localhost:5162/api/Livros/${id}`);
        const data = await response.json();
        console.log("Dados do livro:", data); // Adicionando o log para verificar a resposta

        setLivro(data);
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      }
    };

    fetchLivro();
  }, [id]);

  return (
    <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        {/* Coluna para exibir a imagem do livro xs={12} md={8}*/}
        <Col xs={12} md={4}>
          {livro ? (
            <div>
              <img
                className="livro-imagem"
                src={livro.caminhoImagem}
                alt={livro.titulo}
              />
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </Col>
        <Col xs={12} md={6}>
          {livro ? (
            <div>
              <h1>{livro.titulo}</h1>
              <p>{livro.descricao}</p>
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </Col>
      </Row>

      {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      <Row>
        <Col xs={6} md={4}>
          {livro ? (
            <div>
              <p>ISBN-13: {livro.isbn}</p>

                {livro && livro.editoras ? (
                  
                    <p>Editora: {livro.editoras.nomeEditora}</p>
                  
                ) : (
                  <p>Carregando editora...</p>
                )}

              {/* Avaliação */}
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Avaliação</Typography>
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
              </Box>
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </Col>
        {/* Exibindo informações da Editora */}
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
      </Row>

      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row>
        <Col xs={6}>xs=6</Col>
        <Col xs={6}>xs=6</Col>
      </Row>
    </Container>
  );
}
export default Livro;
