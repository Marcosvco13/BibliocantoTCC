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
      apiBrasil.isbn
        .getBy(isbn)
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
        .catch((error) =>
          console.error("Erro ao obter dados da BrasilAPI:", error)
        );
    }
  }, [isbn]); // Executa quando o ISBN está disponível

  useEffect(() => {
    const autoresCadastrados =
      JSON.parse(localStorage.getItem("autoresCriados")) || [];
    const generosCadastrados =
      JSON.parse(localStorage.getItem("generosCriados")) || [];

    console.log(
      "Autores carregados do localStorage em CadastrarLivro:",
      autoresCadastrados
    );
    console.log(
      "Gêneros carregados do localStorage em CadastrarLivro:",
      generosCadastrados
    );

    if (autoresCadastrados.length > 0) {
      setAutorId(autoresCadastrados);
    } else {
      console.log("Nenhum autor selecionado para cadastrar.");
    }

    if (generosCadastrados.length > 0) {
      setGeneroId(generosCadastrados);
    } else {
      console.log("Nenhum gênero selecionado para cadastrar.");
    }
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

      //navigate("/sua-rota-de-destino");
    } catch (error) {
      console.error("Erro ao atualizar o livro:", error);
    }
  };

  const cadastrarAutoresLivro = async () => {
    try {
      const idLivro = id; // ID do livro que você está associando aos autores

      if (Array.isArray(autorId) && autorId.length > 0) {
        for (const autor of autorId) {
          // Alteração aqui: iterar sobre o array de objetos de autores
          const autorIdSingle = autor.id; // Pegando o ID do autor
          console.log("Enviando ID do autor:", autorIdSingle);
          await api.cadastrarLivroAutor(idLivro, autorIdSingle); // Usando autorIdSingle (id do autor)
        }
        alert("Todos os autores foram associados ao livro com sucesso!");
      } else {
        alert("Nenhum autor selecionado para associar ao livro.");
      }
    } catch (error) {
      console.error(
        "Erro ao associar autores aos livros:",
        error.response ? error.response.data : error.message
      );
      alert("Ocorreu um erro ao associar os autores ao livro.");
    }
  };

  const cadastrarGenerosLivro = async () => {
    try {
      const idLivro = id; // ID do livro que você está associando aos generos

      if (Array.isArray(generoId) && generoId.length > 0) {
        for (const genero of generoId) {
          // Alteração aqui: iterar sobre o array de objetos de gêneros
          const generoIdSingle = genero.id; // Pegando o ID do gênero
          console.log("Enviando ID do genero:", generoIdSingle);
          await api.cadastrarLivroGenero(idLivro, generoIdSingle); // Usando generoIdSingle (id do gênero)
        }
        alert("Todos os generos foram associados ao livro com sucesso!");
      } else {
        alert("Nenhum genero selecionado para associar ao livro.");
      }
    } catch (error) {
      console.error(
        "Erro ao associar generos aos livros:",
        error.response ? error.response.data : error.message
      );
      alert("Ocorreu um erro ao associar os generos ao livro.");
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    await atualizarLivro();
    await cadastrarAutoresLivro();
    await cadastrarGenerosLivro();
  };

  return (
    <div className="Container-CadLivro">
      <br />
      <h2>Cadastrar Livro</h2>
      <br />
      <div className="jumbotron jumbotron-custom">
        <form
          className="form-row"
          onSubmit={(e) => {
            e.preventDefault();
            atualizarLivro();
          }}
        >
          <div className="form-group col-md-8">
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

          <div className="form-group col-md-4">
            <label>ISBN</label>
            <ul className="list-group">
              <li className="list-group-item">{isbn}</li>
            </ul>
          </div>

          <div className="form-group col-md-12">
            <label>Descrição</label>
            <textarea
              className="form-control"
              placeholder="Descrição do livro"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows="2"
            />
          </div>

          <div className="form-group col-md-4">
            <label>Editora</label>
            <ul className="list-group">
              <li className="list-group-item">{editoraId}</li>
            </ul>
          </div>

          <div className="form-group col-md-4">
            <label>Link da Capa</label>
            <input
              type="text"
              className="form-control"
              placeholder="Link da Capa do livro"
              value={caminhoImagem}
              onChange={(e) => setCaminhoImagem(e.target.value)}
            />
          </div>

          <div className="form-group col-md-4">
            <label>Link de Compra</label>
            <input
              type="text"
              className="form-control"
              placeholder="Link de compra do livro"
              value={linkCompra}
              onChange={(e) => setLinkCompra(e.target.value)}
            />
          </div>

          <div className="form-group col-md-4">
            <label>Autores</label>
            <ul className="list-group">
              {autorId.map((autor) => (
                <li key={autor.id} className="list-group-item">
                  {autor.nome}
                </li>
              ))}
            </ul>
          </div>

          <div className="form-group col-md-3">
            <label>Gêneros</label>
            <ul className="list-group">
              <li className="list-group-item">
                {generoId.map((genero) => genero.nome).join("; ")}
              </li>
            </ul>
          </div>

          <br />

          <button
            type="submit"
            className="btn btn-success btnCadastro"
            onClick={handleClick}
          >
            Cadastrar Livro
          </button>
        </form>
      </div>
    </div>
  );
}
