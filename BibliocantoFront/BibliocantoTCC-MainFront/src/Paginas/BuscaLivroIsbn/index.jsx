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
  const [livroIdLocal, setLivroIdLocal] = useState(null);

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
        setLivroIdLocal(response.data.id); // Armazena o ID do livro local
        const livroDetalhes = await api.getLivroById(response.data.id); // Busca detalhes do livro pelo ID

        // Armazenando os dados do livro na variável
        const livroDataLocal = {
          isbn: livroDetalhes.isbn,
          title: livroDetalhes.titulo,
          publisher: livroDetalhes.editoras?.nomeEditora,
          synopsis: livroDetalhes.descricao || "",
          cover_url: livroDetalhes.caminhoImagem || null,
          provider: "local",
        };

        setSelectedLivro(livroDetalhes);
        setIsFromBrasilAPI(false);
        setLivroData(livroDataLocal); // Atualiza o estado com os dados do livro

        // Busca os autores relacionados ao livro
        await fetchAutoresDoLivro(response.data.id); 

        // Busca os gêneros relacionados ao livro
        await fetchGenerosDoLivro(response.data.id); 

        // Adicionando console log para visualizar os dados do livro
        console.log("Dados do livro local:", livroDataLocal);

        localBookFound = true;
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

  const fetchGenerosDoLivro = async (idLivro) => {
    try {
      // Busca os IDs dos gêneros relacionados ao livro
      const generosRelacionados = await api.buscarGenerosPorLivro(idLivro);
      const nomesGeneros = [];
  
      // Para cada gênero relacionado, busca o nome do gênero
      for (const genero of generosRelacionados) {
        const generoDetalhes = await api.buscarGeneroPorId(genero.idGenero);
        nomesGeneros.push(generoDetalhes.nomegenero);
      }
  
      setGeneros(nomesGeneros); // Armazena os nomes dos gêneros no estado
      console.log("Gêneros do livro:", nomesGeneros); // Log dos gêneros para depuração
    } catch (error) {
      console.error("Erro ao processar os gêneros do livro:", error);
    }
  };

  const fetchAutoresDoLivro = async (idLivro) => {
    try {
      // Busca os IDs dos autores relacionados ao livro
      const autoresRelacionados = await api.buscarAutoresPorLivro(idLivro);
      const nomesAutores = [];
  
      // Para cada autor relacionado, busca o nome do autor
      for (const autor of autoresRelacionados) {
        const autorDetalhes = await api.buscarAutorPorId(autor.idAutor);
        nomesAutores.push(autorDetalhes.nomeAutor);
      }
  
      setAutores(nomesAutores); // Armazena os nomes dos autores no estado
      console.log("Autores do livro:", nomesAutores); // Log dos autores para depuração
    } catch (error) {
      console.error("Erro ao processar os autores do livro:", error);
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
        autores.map((nome) => ({ nome })), // Cadastra os autores
        generos.map((nome) => ({ nome }))  // Cadastra os gêneros
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
  
      //alert("Autores e Gêneros cadastrados com sucesso!");
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
                  <img
                    src={"src/assets/No Image.png"}
                    alt="Sem imagem disponível"
                    style={{ width: "100%" }}
                  />
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

      {!selectedLivro && (
    <div className="forminstrucaoisbn">
      <h6>
        O ISBN (International Standard Book Number) é um código numérico que identifica livros, 
        e pode ser encontrado em: Verso da página de rosto, Páginas de direitos autorais, 
        Parte inferior da contracapa, Rodapé da capa protetora, Código de barras
      </h6>

      <img
        className="isbn_instrucao"
        src="src/assets/isbn.jpg"
        alt="ISBN"
      />
    </div>
  )}

    </div>
  );
}
