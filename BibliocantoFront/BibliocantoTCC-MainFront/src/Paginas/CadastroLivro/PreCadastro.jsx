import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
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
  const livro = location.state?.livroData;
  const { isbn } = location.state || {};

  const [novosAutores, setNovosAutores] = useState([]);
  const [novoAutor, setNovoAutor] = useState("");

  const [novosGeneros, setNovosGeneros] = useState([]);
  const [generosDisponiveis, setGenerosDisponiveis] = useState([]);
  const [generosSelecionados, setGenerosSelecionados] = useState([]);

  useEffect(() => {
    async function buscarGeneros() {
      try {
        const resposta = await api.getGeneros();
  
        const generosFormatados = resposta.map((g) => ({
          value: g.id,
          label: g.nomegenero,
        }));
  
        setGenerosDisponiveis(generosFormatados);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    }
  
    buscarGeneros();
  }, []);

  // Armazenar os gêneros selecionados no localStorage quando houver mudança
  useEffect(() => {
    if (generosSelecionados.length > 0) {
      const selectedGeneros = generosSelecionados.map(g => g.value);
      localStorage.setItem('generosSelecionados', JSON.stringify(selectedGeneros));
    }
  }, [generosSelecionados]);

  const autores = Array.isArray(livro?.authors) ? livro.authors : [];

  const [autorIdsCadastrados, setAutorIdsCadastrados] = useState([]);

  const handleCadastrarAutores = async () => {
    try {
      const todosAutores = [...autores, ...novosAutores];
  
      const autorIds = await api.cadastrarAutores(
        todosAutores.map((nome) => ({ nome }))
      );
  
      const autoresCompletos = autorIds.map((id, index) => ({
        id,
        nome: todosAutores[index],
      }));
  
      setAutorIdsCadastrados(autoresCompletos);
  
      localStorage.setItem("autoresCriados", JSON.stringify(autoresCompletos));
  
      alert("Autores cadastrados com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar autores:", error);
      alert("Erro ao cadastrar autores.");
    }
  };
  
  const handleAdicionarAutor = () => {
    if (novoAutor.trim() === "") {
      alert("Por favor, insira o nome do autor.");
      return;
    }
    setNovosAutores([...novosAutores, novoAutor]);
    setNovoAutor("");
  };

  const handleSelecionarGeneros = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedIds = selectedOptions.map((option) => Number(option.value));
    setNovosGeneros(selectedIds);
  };

  return (
    <div className="PagPreCad">
      <div>
        <h2 className="TituloPreCad">Pré-Cadastro</h2>
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
                  <div key={`new-author-${index}`} className="mb-2 d-flex align-items-center">
                    <Form.Control type="text" value={autor} readOnly className="me-2" />
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
                  <Button variant="success" onClick={handleAdicionarAutor} className="button-align">
                    Adicionar
                  </Button>
                </div>
              </>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSubjects">
            <Form.Label>Gêneros</Form.Label>
            <Select
        options={generosDisponiveis}
        value={generosSelecionados}
        onChange={setGenerosSelecionados}
        isMulti
        placeholder="Selecione os gêneros..."
        noOptionsMessage={() => "Nenhum gênero encontrado"}
      />
          </Form.Group>
        </Row>

        <Button
          variant="primary"
          type="submit"
          onClick={async (event) => {
            event.preventDefault();
            try {
              const editoraId = await api.cadastrarEditora(livro.publisher);
              const titulo = livro.title || livro.titulo;
              const livroId = await api.PreCadastroLivro(titulo, isbn, editoraId);

              await handleCadastrarAutores();

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