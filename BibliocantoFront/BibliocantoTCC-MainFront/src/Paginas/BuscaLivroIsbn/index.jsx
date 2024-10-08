import api from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function BuscaLivroIsbn() {
  const [isbn, setISBN] = useState("");
  const [selectedLivro, setSelectedLivro] = useState(null); // Estado para armazenar o livro
  const navigate = useNavigate();

  const handleGetLivro = async (e) => {
  e.preventDefault();

  const isbnData = { isbn };

  const verificaIsbn = /^\d{3}-\d{10}$/;

  if (!verificaIsbn.test(isbn)) {
    // Se não tiver 14 dígitos
    alert("ISBN inválido");
    return;
  }

  try {
    const response = await api.get("/api/Livros/GetLivroByIsbn", {
      params: isbnData,
    });

    if (response.data && Object.keys(response.data).length > 0) {
      // Verifica se o livro foi encontrado
      setSelectedLivro(response.data); // Armazena o livro no estado
    } else {
      // Livro não encontrado, redirecionar para cadastro
      alert("Livro não encontrado no sistema!");
      navigate("/CadastrarLivro");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar livro!");
    navigate("/CadastrarLivro");
  }
};

  const handleInputChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");

    if (valor.length > 3) {
      valor = valor.substring(0, 3) + "-" + valor.substring(3);
    }

    setISBN(valor);
  };

  return (
    <div className="divBuscaIsbn">
      <div className="divTituloBuscaIsbn">
        <h2>
          {selectedLivro ? "Livro já cadastrado" : "Digite o ISBN do livro"}
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
                <img
                  src={selectedLivro.caminhoImagem}
                  alt={selectedLivro.titulo}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-md">
                <div className="modal-text">{selectedLivro.descricao}</div>
                <div className="modal-text">
                  Autor: {selectedLivro.autores?.nomeAutor || "Autor do livro"}
                </div>
                <div className="modal-text">
                  Gênero:{" "}
                  {selectedLivro.generos?.nomegenero || "Gênero do livro"}
                </div>
                <div className="modal-text">
                  Editora:{" "}
                  {selectedLivro.editoras?.nomeEditora || "Editora do livro"}
                </div>
                <div className="modal-text">ISBN: {selectedLivro.isbn}</div>
              </div>
            </div>

            {/* Botão para retornar ao input do ISBN */}
            <button
              type="button"
              className="btnRetornar"
              onClick={() => {
                setSelectedLivro(null); // Limpa o estado do livro e retorna ao formulário
                setISBN(""); // Limpa o valor do input
              }}
            >
              Retornar à busca
            </button>

            {/* Botão para voltar à página inicial */}
            <button
              type="button"
              className="btnVoltarInicio"
              onClick={() => {
                navigate("/"); // Redireciona para a página inicial
              }}
            >
              Voltar ao acervo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}