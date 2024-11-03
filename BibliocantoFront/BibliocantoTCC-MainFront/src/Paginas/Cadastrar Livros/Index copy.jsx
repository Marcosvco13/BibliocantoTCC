import "./CadLivro.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Configuração da BrasilAPI
const apiBrasil = axios.create({
  baseURL: "https://brasilapi.com.br/api",
});

apiBrasil.isbn = {
  getBy: async (isbn) => {
    try {
      const response = await apiBrasil.get(`/isbn/v1/${isbn}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao chamar a BrasilAPI:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};

export default function CadastrarLivro() {
  const { id } = useParams();

  // Inicializa os estados do formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isbn, setIsbn] = useState("");
  const [caminhoImagem, setCaminhoImagem] = useState("");
  const [autorId, setAutorId] = useState([]);
  const [generoId, setGeneroId] = useState([]);
  const [editoraId, setEditoraId] = useState("");
  const [linkCompra, setLinkCompra] = useState("");

  const [generos, setGeneros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);

  // Carrega dados do livro pré-cadastrado
  useEffect(() => {
    if (id) {
      api.get(`/api/Livros/${id}`)
        .then((response) => {
          const livroData = response.data;
          setTitulo(livroData.titulo || "");
          setDescricao(livroData.descricao || "");
          setIsbn(livroData.isbn || "");
          setCaminhoImagem(livroData.caminhoImagem || "");
          setEditoraId(livroData.editoras?.nomeEditora || "");
          setLinkCompra(livroData.linkCompra || "");
        })
        .catch((error) => console.error("Erro ao carregar o livro:", error));
    }

    // Carrega as listas de gêneros, autores e editoras
    api.getGeneros(setGeneros);
    api.getAutores(setAutores);
    api.getEditoras(setEditoras);
  }, [id]);

  // Faz a requisição para a BrasilAPI usando o ISBN, se disponível
  useEffect(() => {
    if (isbn) {
      apiBrasil.isbn.getBy(isbn)
        .then((data) => {
          // Preenche os campos apenas se estiverem vazios
          if (!titulo) setTitulo(data.title || "");
          if (!descricao) setDescricao(data.synopsis || "");
          if (!caminhoImagem) setCaminhoImagem(data.cover_url || "");
          if (!editoraId) setEditoraId(data.publisher || "");

          // Preenche autores e gêneros, se ainda não tiverem sido definidos
          if (autorId.length === 0 && data.authors) {
            setAutorId(data.authors);
          }

          if (generoId.length === 0 && data.subjects) {
            setGeneroId(data.subjects);
          }
        })
        .catch((error) => console.error("Erro ao obter dados da BrasilAPI:", error));
    }
  }, [isbn]); // Executa quando o ISBN está disponível

  // Função para atualizar o livro existente
  const atualizarLivro = async () => {
    // Objeto livro com as informações a serem enviadas
    const livroData = {
      titulo: "1984",                              // Título do livro
      descricao: null,                              // Descrição pode ser null
      caminhoImagem: null,                          // Caminho da imagem pode ser null
      isbn: "978-6555522266",                       // ISBN do livro
      linkCompra: null,                             // Link de compra pode ser null
      editoraId: 121 // Use o ID da editora em vez do objeto completo
    };
  
    console.log("Dados do livro antes da atualização:", livroData); // Log para depuração
    try {
      await api.putLivro(120, livroData); // Atualiza o livro com ID 120
      alert("Livro atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o livro:", error);
      alert("Erro ao atualizar o livro. Por favor, tente novamente.");
    }
  };
  
  
  return (
    <div className="Container-CadLivro">
      <div className="linha-crear">
        <span>
          <Link to="/CadAutores">Cadastrar Autor</Link>
        </span>
        <span>
          <Link to="/CadEditoras">Cadastrar Editora</Link>
        </span>
        <hr className="hrCriarLivro"></hr>
      </div>
      <br />
      <h2>Cadastrar Livro</h2>
      <br />
      <div className="jumbotron jumbotron-custom">
        <form className="formCad">
          <div className="col-4">
            <label>Título</label>
            <input
              type="text"
              className="form-control"
              placeholder="Título do livro"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="col-4">
            <label>Descrição</label>
            <input
              type="text"
              className="form-control"
              placeholder="Descrição do livro"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="col-4">
            <label>ISBN</label>
            <input
              type="text"
              className="form-control"
              placeholder="ISBN do livro"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
            <br />
          </div>

          <div className="col-4">
            <label>Editora</label>
            <ul className="list-group">
              <li className="list-group-item">{editoraId}</li>
            </ul>
          </div>

          <div className="col-4">
            <label>Link da Capa</label>
            <input
              type="text"
              className="form-control"
              placeholder="Link da Capa do livro"
              value={caminhoImagem}
              onChange={(e) => setCaminhoImagem(e.target.value)}
            />
          </div>

          <div className="col-4">
            <label>Link de Compra</label>
            <input
              type="text"
              className="form-control"
              placeholder="Link de compra do livro"
              value={linkCompra}
              onChange={(e) => setLinkCompra(e.target.value)}
            />
          </div>

          <div className="col-4">
            <label>Autores</label>
            <ul className="list-group">
              {autorId.map((autor, index) => (
                <li key={index} className="list-group-item">
                  {autor}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-4">
            <label>Gêneros</label>
            <ul className="list-group">
              {generoId.map((genero, index) => (
                <li key={index} className="list-group-item">
                  {genero}
                </li>
              ))}
            </ul>
          </div>

          <br />
          <button type="submit" className="btn btn-success btnCadastro">
            Cadastrar Livro
          </button>

          <button type="button" className="btn btn-primary" onClick={atualizarLivro}>
  Atualizar Livro
</button>
        </form>
      </div>
    </div>
  );
}
