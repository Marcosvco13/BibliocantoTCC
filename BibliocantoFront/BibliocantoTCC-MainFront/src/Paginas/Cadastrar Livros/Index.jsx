import "./CadLivro.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function CadastrarLivro() {
  const location = useLocation();
  const livroPreCarregado = location.state?.livroData || {};

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isbn, setIsbn] = useState("");
  const [caminhoImagem, setCaminhoImagem] = useState("");
  const [autorId, setAutorId] = useState([]); // armazena nomes
  const [generoId, setGeneroId] = useState([]); // armazena nomes
  const [editoraId, setEditoraId] = useState("");
  const [linkCompra, setLinkCompra] = useState("");

  const navigate = useNavigate();

  const [livros, setLivros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);

  const [selectedAutor, setSelectedAutor] = useState("");
  const [selectedGenero, setSelectedGenero] = useState("");

  useEffect(() => {
    api.getLivros(setLivros);
    api.getGeneros(setGeneros);
    api.getAutores(setAutores);
    api.getEditoras(setEditoras);
  }, []);

  // Atualiza os campos de acordo com os dados pré-carregados
  useEffect(() => {
    if (livroPreCarregado) {
      setTitulo(livroPreCarregado.titulo || "");
      setDescricao(livroPreCarregado.descricao || "");
      setIsbn(livroPreCarregado.isbn || "");
      setCaminhoImagem(
        livroPreCarregado.caminhoImagem || livroPreCarregado.cover_url || ""
      );
      setAutorId(livroPreCarregado.autorId || []); // armazena nomes
      setGeneroId(livroPreCarregado.generoId || []); // armazena nomes
      setEditoraId(livroPreCarregado.editora || "");
    }
  }, [livroPreCarregado]);

  const handleAddAutor = () => {
    if (selectedAutor) {
      const autorSelecionado = autores.find(
        (autor) => autor.nomeAutor === selectedAutor
      );
      if (autorSelecionado) {
        setAutorId((prev) => [...prev, autorSelecionado.nomeAutor]); // armazena nome
      }
      setSelectedAutor("");
    }
  };

  const handleAddGenero = () => {
    if (selectedGenero) {
      const generoSelecionado = generos.find(
        (genero) => genero.nomegenero === selectedGenero
      );
      if (generoSelecionado) {
        setGeneroId((prev) => [...prev, generoSelecionado.nomegenero]); // armazena nome
      }
      setSelectedGenero("");
    }
  };

  const handleCadastrarLivro = async (e) => {
    e.preventDefault();

    const livroData = {
      titulo,
      descricao,
      isbn,
      caminhoImagem,
      linkCompra,
      autorId: autorId, // já são os nomes
      generoId: generoId, // já são os nomes
      editoraId,
    };

    try {
      const livroCadastrado = await api.cadastrarLivro(livroData);
      console.log("Livro cadastrado com sucesso:", livroCadastrado);

      api.getLivros(setLivros);
      setTitulo("");
      setDescricao("");
      setIsbn("");
      setCaminhoImagem("");
      setAutorId([]);
      setGeneroId([]);
      setEditoraId("");
      setLinkCompra("");

      alert("Livro cadastrado com sucesso");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao cadastrar o livro:", error);
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
        <form onSubmit={handleCadastrarLivro} className="formCad">
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
              required
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
            <label>Autor</label>
            <ul className="list-group">
              {[...new Set(autorId)].map((autor, index) => (
                <li key={index} className="list-group-item">
                  {autor}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-4">
            <label>Gênero</label>
            <ul className="list-group">
              {[...new Set(generoId)].map((genero, index) => (
                <li key={index} className="list-group-item">
                  {genero}
                </li>
              ))}
            </ul>
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
              required
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
              required
            />
          </div>

          <br />
          <button type="submit" className="btn btn-success btnCadastro">
            Cadastrar Livro
          </button>
        </form>
      </div>
    </div>
  );
}
