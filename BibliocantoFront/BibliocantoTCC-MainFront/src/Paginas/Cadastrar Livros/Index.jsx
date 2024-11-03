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
  const navigate = useNavigate();

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
  const [idEditora, setIdEditora] = useState(null);

  // Carrega dados do livro pré-cadastrado e busca ID da editora
  useEffect(() => {
    const carregarDadosLivro = async () => {
      if (id) {
        try {
          const response = await api.get(`/api/Livros/${id}`);
          const livroData = response.data;
          setTitulo(livroData.titulo || "");
          setIsbn(livroData.isbn || "");
          setEditoraId(livroData.editoras?.nomeEditora || "");

          // Busca o ID da editora
          const idDaEditora = await RequisicaoEditora(
            livroData.editoras?.nomeEditora
          );
          if (idDaEditora) {
            setIdEditora(idDaEditora); // Armazena o ID da editora
          }
        } catch (error) {
          console.error("Erro ao carregar o livro:", error);
        }
      }
    };

    carregarDadosLivro();

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

  useEffect(() => {
    // Carregar dados do localStorage
    const autoresCriados = JSON.parse(localStorage.getItem("autoresCriados")) || [];
    const generosCriados = JSON.parse(localStorage.getItem("generosCriados")) || [];

    //console.log("Autores Criados:", autoresCriados);
    //console.log("Gêneros Criados:", generosCriados);
    
    setAutorId(autoresCriados);
    setGeneroId(generosCriados);
  }, []);

  // Função para buscar o ID da editora pelo nome
  const RequisicaoEditora = async (editoraNome) => {
    try {
      console.log("Buscando editora com nome:", editoraNome);
      const editoraData = await api.getEditoraByName(editoraNome);

      if (editoraData && editoraData.length > 0) {
        const editora = editoraData[0];
        if (editora.id) {
          console.log("ID da Editora:", editora.id);
          return editora.id;
        } else {
          console.error("Editora não encontrada ou ID não disponível");
          return null;
        }
      } else {
        console.error("Editora não encontrada ou ID não disponível");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar o ID da editora:", error);
      return null;
    }
  };

  const atualizarLivro = async () => {
    try {
      const livroData = {
        titulo,
        descricao,
        caminhoImagem,
        isbn,
        linkCompra,
        editoraId: idEditora, // Use o ID da editora armazenado
      };

      // Chame a função da API para atualizar o livro
      const updatedBook = await api.putLivro(id, livroData);
      console.log("Livro atualizado com sucesso:", updatedBook);

      // Redireciona ou faz outra ação após a atualização
      //navigate("/sua-rota-de-destino"); // Altere para a rota que você deseja redirecionar
    } catch (error) {
      console.error("Erro ao atualizar o livro:", error);
    }
  };

  const cadastrarAutoresLivro = async () => {
    try {
      const idLivro = id;
  
      // Assegura que autorId é um array de IDs de autores
      if (Array.isArray(autorId) && autorId.length > 0) {
        for (const autor of autorId) {
          await api.cadastrarLivroAutor(idLivro, autor); // Usa 'autor' em vez de 'autorId'
        }
        alert("Todos os autores foram cadastrados com sucesso!");
      } else {
        alert("Nenhum autor selecionado para cadastrar.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar autores:", error);
      alert("Ocorreu um erro ao cadastrar os autores.");
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
        <form
          className="formCad"
          onSubmit={(e) => {
            e.preventDefault();
            atualizarLivro();
          }}
        >
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
          <button type="submit" className="btn btn-success btnCadastro" onClick={atualizarLivro}>
            Cadastrar Livro
          </button>

          <button type="submit" className="btn btn-success btnCadastro" onClick={cadastrarAutoresLivro}>
            Cadastrar Livro/Autor
          </button>
        </form>
      </div>
    </div>
  );
}
