import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import api from "../../services/api";
import "./PreCadastro.css";

function PreCadastro() {
  const location = useLocation();
  const navigate = useNavigate();
  const livro = location.state?.livroData; // Acessa os dados passados
  const { isbn } = location.state || {};

  // Estado para armazenar os autores inseridos manualmente
  const [novosAutores, setNovosAutores] = useState([]);

  // Estado para armazenar o novo autor que está sendo digitado
  const [novoAutor, setNovoAutor] = useState("");

  // Estado para armazenar os gêneros inseridos manualmente
  const [novosGeneros, setNovosGeneros] = useState([]);

  // Estado para armazenar o novo gênero que está sendo digitado
  const [novoGenero, setNovoGenero] = useState("");

  useEffect(() => {
    // Exibe os dados do livro no console
    if (livro) {
      //console.log("Dados do livro recebidos da página de busca por isbn:", livro);
      //console.log("ISBN recebido:", isbn);
    } else {
      //console.log("Nenhum dado foi recebido na página de cadastro.");
    }
  }, [livro]);

  const autores = Array.isArray(livro?.authors) ? livro.authors : [];
const generos = Array.isArray(livro?.subjects) ? livro.subjects : [];

  // Estados para armazenar os IDs dos autores e gêneros cadastrados
  const [autorIdsCadastrados, setAutorIdsCadastrados] = useState([]);
  const [generoIdsCadastrados, setGeneroIdsCadastrados] = useState([]);

// Função para cadastrar autores e gêneros usando a API
const handleCadastrarAutoresEGêneros = async () => {
  try {
    // Combina os autores automáticos e manuais
    const todosAutores = [
      ...autores, // Autores automáticos
      ...novosAutores, // Autores adicionados manualmente
    ];

    // Combina os gêneros automáticos e manuais
    const todosGeneros = [
      ...generos, // Gêneros automáticos
      ...novosGeneros, // Gêneros adicionados manualmente
    ];

    // Chama a API para cadastrar os autores e gêneros
    const { autorIds, generoIds } = await api.cadastrarAutoresEGêneros(
      todosAutores.map((nome) => ({ nome })), // Cadastra os autores
      todosGeneros.map((nome) => ({ nome })) // Cadastra os gêneros
    );

    // Criar objetos com id e nome para autores e gêneros
    const autoresCompletos = autorIds.map((id, index) => ({
      id,
      nome: todosAutores[index],
    }));
    const generosCompletos = generoIds.map((id, index) => ({
      id,
      nome: todosGeneros[index],
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


 // Função para adicionar o novo autor
const handleAdicionarAutor = () => {
  if (novoAutor.trim() === "") {
    alert("Por favor, insira o nome do autor.");
    return;
  }

  // Adiciona o novo autor ao estado
  const autoresAtualizados = [...novosAutores, novoAutor];
  setNovosAutores(autoresAtualizados);
  setNovoAutor(""); // Limpa o campo de input

  // Log para verificar como os autores estão sendo armazenados
  //console.log("Autores cadastrados:", autoresAtualizados);
};

// Função para adicionar o novo gênero
const handleAdicionarGenero = () => {
  if (novoGenero.trim() === "") {
    alert("Por favor, insira o nome do gênero.");
    return;
  }

  // Adiciona o novo gênero ao estado
  const generosAtualizados = [...novosGeneros, novoGenero];
  setNovosGeneros(generosAtualizados);
  setNovoGenero(""); // Limpa o campo de input

  // Log para verificar como os gêneros estão sendo armazenados
  //console.log("Gêneros cadastrados:", generosAtualizados);
};

  return (
    <div className="PagPreCad">
      <div className="TituloPreCad">
        <h2>Pré-Cadastro</h2>
      </div>
    <Form className="formprecadastro">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            defaultValue={isbn}
            placeholder="Enter ISBN"
            readOnly
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            defaultValue={livro.title}
            placeholder="Enter Title"
            readOnly
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridPublisher">
        <Form.Label>Publisher</Form.Label>
        <Form.Control
          type="text"
          defaultValue={livro.publisher}
          placeholder="Enter Publisher"
          readOnly
        />
      </Form.Group>

      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridAuthors">
  <Form.Label>Authors</Form.Label>
  {autores.length > 0 ? (
    autores.map((author, index) => (
      <Form.Control
        key={`author-${index}`}
        type="text"
        defaultValue={author}
        placeholder={`Author ${index + 1}`}
        className="mb-2"
        readOnly
      />
    ))
  ) : (
    <>
      <p className="alerta-vermelho">Nenhum autor encontrado. Adicione manualmente abaixo:</p>
      {novosAutores.map((autor, index) => (
        <div
          key={`new-author-${index}`}
          className="mb-2 d-flex align-items-center"
        >
          <Form.Control
            type="text"
            value={autor}
            readOnly
            className="me-2"
          />
        </div>
      ))}
      <div className="d-flex align-items-center gap-2">
        <Form.Control
          type="text"
          value={novoAutor}
          onChange={(e) => setNovoAutor(e.target.value)}
          placeholder="Novo autor"
          className="input-align"
        />
        <Button variant="success"
         onClick={handleAdicionarAutor} 
         className="button-align">
          Adicionar
        </Button>
      </div>
    </>
  )}
</Form.Group>

<Form.Group as={Col} controlId="formGridSubjects">
  <Form.Label>Subjects</Form.Label>
  {generos.length > 0 ? (
    generos.map((subject, index) => (
      <Form.Control
        key={`subject-${index}`}
        type="text"
        defaultValue={subject}
        placeholder={`Subject ${index + 1}`}
        className="mb-2"
        readOnly
      />
    ))
  ) : (
    <>
      <p className="alerta-vermelho">Nenhum gênero encontrado. Adicione manualmente abaixo:</p>
      {novosGeneros.map((genero, index) => (
        <div
          key={`new-subject-${index}`}
          className="mb-2 d-flex align-items-center"
        >
          <Form.Control
            type="text"
            value={genero}
            readOnly
            className="me-2"
          />
        </div>
      ))}
      <div className="d-flex align-items-center gap-2">
        <Form.Control
          type="text"
          value={novoGenero}
          onChange={(e) => setNovoGenero(e.target.value)}
          placeholder="Novo gênero"
          className="input-align"
        />
        <Button variant="success" 
        onClick={handleAdicionarGenero} 
        className="button-align">
          Adicionar
        </Button>
      </div>
    </>
  )}
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
            //console.log("Editora cadastrada com ID:", editoraId);

            // Pre-cadastro do livro
            const titulo = livro.title || livro.titulo;
            const livroId = await api.PreCadastroLivro(titulo, isbn, editoraId);

            //console.log("Livro pré-cadastrado com ID:", livroId);

            // Cadastra autores e gêneros
            await handleCadastrarAutoresEGêneros();

            navigate(`/FinalizarCadastro`, {
              state: {
                livroData: { ...livro, id: livroId },
              },
            });
          } catch (error) {
            console.error("Erro ao pre-cadastrar o livro:", error);
          }
        }}

        className="btn-pre-cadastrar-livro"
      >
        Pre-Cadastrar Livro
      </Button>
    </Form>
    </div>
  );
}

export default PreCadastro;
