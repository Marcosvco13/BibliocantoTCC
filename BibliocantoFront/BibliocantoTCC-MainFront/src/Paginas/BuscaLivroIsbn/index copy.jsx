import api from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

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

export default function BuscaLivroIsbn() {

  const [isbn, setISBN] = useState("");
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [isFromBrasilAPI, setIsFromBrasilAPI] = useState(false);
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const navigate = useNavigate();

  const handleGetLivro = async (e) => {
    e.preventDefault();

    const verificaIsbn = /^(978|979)-?\d{10}$/; // Regex para ISBN-13

    if (!verificaIsbn.test(isbn)) {
      alert("ISBN inválido");
      return;
    }

    const isbnData = { isbn };
    let localBookFound = false;

    try {
      const response = await api.get("/api/Livros/GetLivroByIsbn", {
        params: isbnData,
      });

      if (response.data && Object.keys(response.data).length > 0) {
        setSelectedLivro(response.data);
        setIsFromBrasilAPI(false);
        localBookFound = true;
        const autoresList =
          response.data.autores?.map((autor) => autor.nomeAutor) || [];
        const generosList =
          response.data.generos?.map((genero) => genero.nomeGenero) || [];
        setAutores(autoresList);
        setGeneros(generosList);

        // Log autores e gêneros
        console.log("Autores do livro:", autoresList);
        console.log("Gêneros do livro:", generosList);
      }
    } catch (error) {
      if (!(error.response && error.response.status === 404)) {
        alert("Erro inesperado ao buscar livro no banco de dados local.");
        return;
      }
    }

    if (!localBookFound) {
      try {
        const livroBrasilAPI = await apiBrasil.isbn.getBy(isbn);
        if (livroBrasilAPI) {
          setSelectedLivro(livroBrasilAPI);
          setIsFromBrasilAPI(true);
          const autoresList = livroBrasilAPI.authors || [];
          const generosList = livroBrasilAPI.subjects || [];
          setAutores(autoresList);
          setGeneros(generosList);

          // Log autores e gêneros
          console.log("Autores do livro BrasilAPI:", autoresList);
          console.log("Gêneros do livro BrasilAPI:", generosList);
        } else {
          alert("Livro não encontrado na BrasilAPI!");
          navigate("/CadastrarLivro");
        }
      } catch (error) {
        alert(
          "Livro não encontrado nem no banco de dados local nem na BrasilAPI!"
        );
        navigate("/CadastrarLivro");
      }
    }
  };

  // Função para cadastrar autores e gêneros usando a API
  const handleCadastrarAutoresEGêneros = async () => {
    try {
      await api.cadastrarAutoresEGêneros(
        autores.map((nome) => ({ nome })),
        generos.map((nome) => ({ nome }))
      );
      alert("Autores e Gêneros cadastrados com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar autores e gêneros:", error);
      alert("Erro ao cadastrar autores e gêneros.");
    }
  };

  const handleInputChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 3) {
      valor = valor.substring(0, 3) + "-" + valor.substring(3);
    }
    setISBN(valor);
  };

  const handleCarregarLivroApi = async (e) => {
    e.preventDefault();
  
    console.log('Livro pré-carregado:', selectedLivro);
  
    // Cria objeto com os dados do livro
    const livroData = {
      titulo: selectedLivro.title,
      descricao: selectedLivro.synopsis || "",
      isbn: selectedLivro.isbn,
      caminhoImagem: selectedLivro.cover_url || "",
      autorId: [],
      generoId: [],
      editora: selectedLivro.publisher,
    };
  
    // Busca IDs de autores
    try {
      const autoresIds = await Promise.all(
        selectedLivro.authors.map(async (nome) => {
          const id = await api.getAutorByName(nome);
          return id ? id : null; // Retorna null se não encontrar
        })
      );
      livroData.autorId = autoresIds.filter(id => id); // Filtra IDs válidos
    } catch (error) {
      console.error("Erro ao buscar IDs de autores:", error);
    }
  
    // Busca IDs de gêneros
    try {
      const generosIds = await Promise.all(
        selectedLivro.subjects.map(async (subject) => {
          const id = await api.getGeneroByName(subject);
          return id ? id : null; // Retorna null se não encontrar
        })
      );
      livroData.generoId = generosIds.filter(id => id); // Filtra IDs válidos
    } catch (error) {
      console.error("Erro ao buscar IDs de gêneros:", error);
    }
  
    // Passa os dados do livro para a página de cadastro
    navigate('/CadastrarLivro', { state: { livroData } });
    window.location.reload();

    console.log(livroData);
  };
  

  return (
    <div className="divBuscaIsbn">
      <div className="divTituloBuscaIsbn">
        <h2>
          {selectedLivro
            ? isFromBrasilAPI
              ? "Cadastrar Livro"
              : "Livro já cadastrado"
            : "Digite o ISBN do livro"}
        </h2>
      </div>

      <div className="formBuscaIsbn">
        {!selectedLivro && (
          <div className="divInputBuscaIsbn">
            <input
              className="isbnBusca"
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={handleInputChange}
              maxLength={14}
              required
            />
          </div>
        )}

        {!selectedLivro && (
          <button
            type="button"
            className="btnBuscaIsbn"
            onClick={handleGetLivro}
          >
            Verificar
          </button>
        )}

        {selectedLivro && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                {selectedLivro.caminhoImagem ? (
                  <img
                    src={selectedLivro.caminhoImagem}
                    alt={selectedLivro.titulo || selectedLivro.title}
                    style={{ width: "100%" }}
                  />
                ) : selectedLivro.cover_url ? (
                  <img
                    src={selectedLivro.cover_url}
                    alt={selectedLivro.title}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>Sem imagem disponível</div>
                )}
              </div>
              <div className="col-md">
                <div className="modal-text">
                  Título: {selectedLivro.titulo || selectedLivro.title}
                </div>
                <div className="modal-text">
                  Autor: {autores.join(", ") || "Autor não disponível"}
                </div>
                <div className="modal-text">
                  Gênero: {generos.join(", ") || "Gênero não disponível"}
                </div>
                <div className="modal-text">
                  Editora:{" "}
                  {isFromBrasilAPI
                    ? selectedLivro.publisher
                    : selectedLivro?.editoras?.nomeEditora ||
                      "Editora não disponível"}
                </div>
                <div className="modal-text">ISBN: {selectedLivro.isbn}</div>
              </div>
            </div>

            <div className="divBotoes">
              <button
                type="button"
                className="btnRetornar"
                onClick={() => {
                  setSelectedLivro(null);
                  setISBN("");
                }}
              >
                Retornar à busca
              </button>

              <button
                type="button"
                className="btnVoltarInicio"
                onClick={() => {
                  navigate("/");
                }}
              >
                Voltar ao acervo
              </button>

              {isFromBrasilAPI && (
                <>
                  <button
                    type="button"
                    className="btnCadastrarLivro"
                    onClick={handleCarregarLivroApi}
                  >
                    Ir para pagina de cadastro de livro
                  </button>
                  <button
                    type="button"
                    className="btnCriarAutoresGeneros"
                    onClick={handleCadastrarAutoresEGêneros}
                  >
                    Criar Autores e Gêneros
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
