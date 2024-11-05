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
  const [livroData, setLivroData] = useState(null);

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
        // Armazenando os dados do livro na variável
        const livroDataLocal = {
          isbn: response.data.isbn,
          title: response.data.titulo || response.data.title,
          authors: response.data.autores?.map((autor) => autor.nomeAutor) || [],
          publisher:
            response.data.editoras?.nomeEditora || response.data.publisher,
          synopsis: response.data.sinopse || response.data.synopsis,
          subjects:
            response.data.generos?.map((genero) => genero.nomeGenero) || [],
          cover_url: response.data.caminhoImagem || response.data.cover_url,
          provider: "local",
        };

        setSelectedLivro(response.data);
        setIsFromBrasilAPI(false);
        localBookFound = true;
        setAutores(livroDataLocal.authors);
        setGeneros(livroDataLocal.subjects);
        setLivroData(livroDataLocal); // Atualiza o estado com os dados do livro

        // Adicionando console log para visualizar os dados do livro
        console.log("Dados do livro local:", livroDataLocal);
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
          // Armazenando os dados do livro na variável
          const livroData = {
            isbn: livroBrasilAPI.isbn,
            title: livroBrasilAPI.title,
            authors: livroBrasilAPI.authors || [],
            publisher: livroBrasilAPI.publisher,
            synopsis: livroBrasilAPI.synopsis || null,
            subjects: livroBrasilAPI.subjects || [],
            cover_url: livroBrasilAPI.cover_url || null,
            provider: "brasilapi",
          };

          setSelectedLivro(livroBrasilAPI);
          setIsFromBrasilAPI(true);
          setAutores(livroData.authors);
          setGeneros(livroData.subjects);

          // Log dos dados do livro da BrasilAPI
          console.log("Dados do livro BrasilAPI:", livroData);
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

  const handleInputChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 3) {
      valor = valor.substring(0, 3) + "-" + valor.substring(3);
    }
    setISBN(valor);
  };

  // Estados para armazenar os IDs dos autores e gêneros cadastrados
  const [autorIdsCadastrados, setAutorIdsCadastrados] = useState([]);
  const [generoIdsCadastrados, setGeneroIdsCadastrados] = useState([]);

  // Função para cadastrar autores e gêneros usando a API
  const handleCadastrarAutoresEGêneros = async () => {
    try {
      // Chama a API para cadastrar os autores e gêneros
      const { autorIds, generoIds } = await api.cadastrarAutoresEGêneros(
        autores.map((nome) => ({ nome })),
        generos.map((nome) => ({ nome }))
      );
  
      // Armazena os IDs dos autores e gêneros no estado e no localStorage
      setAutorIdsCadastrados(autorIds);
      setGeneroIdsCadastrados(generoIds);
  
      // Salva no localStorage
      localStorage.setItem("autoresCriados", JSON.stringify(autorIds));
      localStorage.setItem("generosCriados", JSON.stringify(generoIds));
  
      alert("Autores e Gêneros cadastrados com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar autores e gêneros:", error);
      alert("Erro ao cadastrar autores e gêneros.");
    }
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
                    onClick={async () => {
                      try {
                        const editoraId = await api.cadastrarEditora(
                          selectedLivro.publisher
                        );

                        const titulo =
                          selectedLivro.title || selectedLivro.titulo;
                        const livroId = await api.PreCadastroLivro(
                          titulo,
                          isbn,
                          editoraId
                        );

                        
                        console.log("Editora e livro cadastrados com sucesso!");
                        await handleCadastrarAutoresEGêneros();

                        navigate(`/CadastrarLivro/${livroId}`, {
                          state: { livroData },
                        });
                      } catch (error) {
                        console.error("Erro ao pre-cadastrar os dados:", error);
                      }
                    }}
                  >
                    Cadastrar Livro
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
