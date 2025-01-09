import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import api from "../../services/api";

function PreCadastro() {
  const location = useLocation();
  const navigate = useNavigate();
  const livro = location.state?.livroData; // Acessa os dados passados
  const { isbn } = location.state || {};

  useEffect(() => {
    // Exibe os dados do livro no console
    if (livro) {
      //console.log("Dados do livro recebidos da página de busca por isbn:", livro);
      //console.log("ISBN recebido:", isbn);
    } else {
      //console.log("Nenhum dado foi recebido na página de cadastro.");
    }
  }, [livro]);

  const autores = livro.authors || [];
  const generos = livro.subjects || [];
  // Estados para armazenar os IDs dos autores e gêneros cadastrados
  const [autorIdsCadastrados, setAutorIdsCadastrados] = useState([]);
  const [generoIdsCadastrados, setGeneroIdsCadastrados] = useState([]);

  // Função para cadastrar autores e gêneros usando a API
  const handleCadastrarAutoresEGêneros = async () => {
    try {
      // Chama a API para cadastrar os autores e gêneros
      const { autorIds, generoIds } = await api.cadastrarAutoresEGêneros(
        autores.map((nome) => ({ nome })), // Cadastra os autores
        generos.map((nome) => ({ nome })) // Cadastra os gêneros
      );

      // Criar objetos com id e nome para autores e gêneros
      const autoresCompletos = autorIds.map((id, index) => ({
        id,
        nome: autores[index],
      }));
      const generosCompletos = generoIds.map((id, index) => ({
        id,
        nome: generos[index],
      }));

      // Armazena os dados completos no estado e no localStorage
      setAutorIdsCadastrados(autoresCompletos);
      setGeneroIdsCadastrados(generosCompletos);

      // Salva os dados completos no localStorage
      localStorage.setItem("autoresCriados", JSON.stringify(autoresCompletos));
      localStorage.setItem("generosCriados", JSON.stringify(generosCompletos));

      alert("Autores e Gêneros cadastrados com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar autores e gêneros:", error);
      alert("Erro ao cadastrar autores e gêneros.");
    }
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            defaultValue={isbn}
            placeholder="Enter ISBN"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            defaultValue={livro.title}
            placeholder="Enter Title"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridPublisher">
        <Form.Label>Publisher</Form.Label>
        <Form.Control
          type="text"
          defaultValue={livro.publisher}
          placeholder="Enter Publisher"
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAuthors">
          <Form.Label>Authors</Form.Label>
          {livro.authors?.map((author, index) => (
            <Form.Control
              key={`author-${index}`}
              type="text"
              defaultValue={author}
              placeholder={`Author ${index + 1}`}
              className="mb-2"
            />
          ))}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSubjects">
          <Form.Label>Subjects</Form.Label>
          {livro.subjects?.map((subject, index) => (
            <Form.Control
              key={`subject-${index}`}
              type="text"
              defaultValue={subject}
              placeholder={`Subject ${index + 1}`}
              className="mb-2"
            />
          ))}
        </Form.Group>
      </Row>

      <Button
        variant="primary"
        type="submit"
        onClick={async (event) => {
          event.preventDefault();

          try {
            // Cadastra a editora
            const editoraId = await api.cadastrarEditora(livro.publisher);
            console.log("Editora cadastrada com ID:", editoraId);
      
            // Pre-cadastro do livro
            const titulo = livro.title || livro.titulo;
            const livroId = await api.PreCadastroLivro(titulo, isbn, editoraId);
      
            console.log("Livro pré-cadastrado com ID:", livroId);
      
            // Cadastra autores e gêneros
            await handleCadastrarAutoresEGêneros();

            navigate(`/FinalizarCadastro`, {
              state: { 
                livroData: { ...livro, id: livroId }
            },
            });

          } catch (error) {
            console.error("Erro ao pre-cadastrar o livro:", error);
          }
        }}
      >
        Pre-Cadastrar Livro
      </Button>
    </Form>
  );
}

export default PreCadastro;
