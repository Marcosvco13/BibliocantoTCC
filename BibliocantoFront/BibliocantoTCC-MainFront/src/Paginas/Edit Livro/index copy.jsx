import "./EditLivroStyle.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import Livro from "../../Componentes/Livro/index";
import { useParams } from "react-router-dom";

function EditarLivro() {

  // carregar os dados
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isbn, setIsbn] = useState("");
  const [caminhoImagem, setCaminhoImagem] = useState("");
  const [autorId, setAutorId] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [editoraId, setEditoraId] = useState("");

  const [livroEditando, setLivroEditando] = useState(null); // State for the book being edited

  const [livros, setLivros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);

  // carregar os dados da api
  useEffect(() => {
    api.getLivros(setLivros);
    api.getGeneros(setGeneros);
    api.getAutores(setAutores);
    api.getEditoras(setEditoras);
  }, []);

  // funcao para enviar o formulario
  const handleCadastrarLivro = async (e) => {
    e.preventDefault();

    const novoLivro = {
      titulo,
      descricao,
      isbn,
      caminhoImagem,
      autorId: parseInt(autorId),
      generoId: parseInt(generoId),
      editoraId: parseInt(editoraId),
    };

    try {
        if (livroEditando) {
            // editar livro existente
            await api.putLivro(livroEditando.id, novoLivro);
            console.log("Livro atualizado com sucesso!");
        } else {
            // registrar novo livro
            const livroCadastrado = await api.cadastrarLivro(novoLivro);
            console.log("Livro cadastrado com sucesso:", livroCadastrado);
        }
        // atualizar a lista
        api.getLivros(setLivros);
        // limpar o formulario
        resetForm();
    } catch (error) {
        console.error("Erro ao cadastrar ou editar o livro:", error);
    }
  };

  // Ffuncao para edicao do livro
  const handleEdit = (id) => {
    const livroSelecionado = livros.find((livro) => livro.id === id);
    
    if (!livroSelecionado) {
      console.error("Livro não encontrado!");
      return;
    }

    setLivroEditando(livroSelecionado);

    // Populate form with selected book data
    setTitulo(livroSelecionado.titulo || "");
    setDescricao(livroSelecionado.descricao || "");
    setIsbn(livroSelecionado.isbn || "");
    setCaminhoImagem(livroSelecionado.caminhoImagem || "");

    // Convert IDs to string to properly select the options
    setAutorId(livroSelecionado.autores?.id?.toString() || "");
    setGeneroId(livroSelecionado.generos?.id?.toString() || "");
    setEditoraId(livroSelecionado.editoras?.id?.toString() || "");
};


  // resetar o formulario
  const resetForm = () => {
    setTitulo("");
    setDescricao("");
    setIsbn("");
    setCaminhoImagem("");
    setAutorId("");
    setGeneroId("");
    setEditoraId("");
    setLivroEditando(null);
  };

  const token = localStorage.getItem("token");
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // funcao para deletar o livro
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/Livros/${id}`, authorization);
      setLivros(livros.filter((livro) => livro.id !== id)); // remove o livro da lista
      console.log("Livro deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar o livro:", error);
    }
  };

  return (
    <div className="Container">
      <br />
      <h2>{livroEditando ? "Editar Livro" : "Cadastrar Livro"}</h2>
      <br />
      <div className="jumbotron jumbotron-custom">
        <form onSubmit={handleCadastrarLivro}>
          <div className="row">
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
            </div>
            <div className="col-4">
              <label>Autor</label>
              <select
                className="form-control"
                value={autorId}
                onChange={(e) => setAutorId(e.target.value)}
                required
              >
                <option value="">Selecione um autor</option>
                {autores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nomeAutor}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <label>Gênero</label>
              <select
                className="form-control"
                value={generoId}
                onChange={(e) => setGeneroId(e.target.value)}
                required
              >
                <option value="">Selecione um gênero</option>
                {generos.map((genero) => (
                  <option key={genero.id} value={genero.id}>
                    {genero.nomegenero}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <label>Editora</label>
              <select
                className="form-control"
                value={editoraId}
                onChange={(e) => setEditoraId(e.target.value)}
                required
              >
                <option value="">Selecione uma editora</option>
                {editoras.map((editora) => (
                  <option key={editora.id} value={editora.id}>
                    {editora.nomeEditora}
                  </option>
                ))}
              </select>
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
          </div>
          <br />
          <button type="submit" className="btn btn-success btn-lg btn-block">
            {livroEditando ? "Salvar Alterações" : "Cadastrar"}
          </button>
          {livroEditando && (
            <button
              type="button"
              className="btn btn-secondary btn-lg btn-block"
              onClick={resetForm}
            >
              Cancelar Edição
            </button>
          )}
        </form>
      </div>
      <div> {/* 
       <table className="table table-hover table-dark table-custom">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Título</th>
            <th scope="col">Autor</th>
            <th scope="col">Gênero</th>
            <th scope="col">ISBN</th>
            <th scope="col">Descrição</th>
            <th scope="col">Editora</th>
            <th scope="col">Caminho da Imagem</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <Livro livros={livros} onDelete={handleDelete} onEdit={handleEdit} />
        </tbody>
      </table> 
      */ }
      </div>
    </div>
    
  );
}

export default EditarLivro;