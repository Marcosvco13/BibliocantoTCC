import api from '../../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const apiBrasil = axios.create({
    baseURL: "https://brasilapi.com.br/api",
});

apiBrasil.isbn = {
    getBy: async (isbn) => {
        try {
            const response = await apiBrasil.get(`/isbn/v1/${isbn}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao chamar a BrasilAPI:", error.response ? error.response.data : error.message);
            throw error;
        }
    },
};

export default function BuscaLivroIsbn() {
    const [isbn, setISBN] = useState("");
    const [selectedLivro, setSelectedLivro] = useState(null);
    const navigate = useNavigate();

    const handleGetLivro = async (e) => {
        e.preventDefault();

        // Regex para verificar o formato de ISBN com traço
        const verificaIsbn = /^\d{3}-\d{10}$/;

        if (!verificaIsbn.test(isbn)) {
          alert("ISBN inválido");
          return;
        }

        const isbnData = { isbn };
        let localBookFound = false;

        try {
            console.log("Buscando livro no banco de dados local com ISBN:", isbn);
            const response = await api.get("/api/Livros/GetLivroByIsbn", { params: isbnData });

            if (response.data && Object.keys(response.data).length > 0) {
                console.log("Livro encontrado no banco de dados local:", response.data);
                setSelectedLivro(response.data);
                localBookFound = true;
            } else {
                console.log("Livro não encontrado no banco de dados local. Tentando na BrasilAPI...");
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("Livro não encontrado no banco de dados local. Continuando...");
            } else {
                console.error("Erro inesperado ao buscar livro no banco de dados local:", error.response ? error.response.data : error.message);
                alert("Erro inesperado ao buscar livro no banco de dados local.");
                return;
            }
        }

        if (!localBookFound) {
            try {
                console.log("Buscando livro na BrasilAPI com ISBN:", isbn);
                const livroBrasilAPI = await apiBrasil.isbn.getBy(isbn);
                console.log("Resposta da BrasilAPI:", livroBrasilAPI);

                if (livroBrasilAPI) {
                    setSelectedLivro(livroBrasilAPI);
                } else {
                    alert("Livro não encontrado na BrasilAPI!");
                    navigate("/CadastrarLivro");
                }
            } catch (error) {
                console.error("Erro ao buscar livro na BrasilAPI:", error.response ? error.response.data : error.message);
                alert("Livro não encontrado nem no banco de dados local nem na BrasilAPI!");
                navigate("/CadastrarLivro");
            }
        }
    };

    // Função para formatar o ISBN com "-" e remover caracteres não numéricos
    const handleInputChange = (e) => {
        let valor = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (valor.length > 3) {
            valor = valor.substring(0, 3) + "-" + valor.substring(3); // Adiciona o traço após os primeiros 3 dígitos
        }

        setISBN(valor);
    };
    
  return (
    <div className="divBuscaIsbn">
      <div className="divTituloBuscaIsbn">
        <h2>{selectedLivro ? "Livro já cadastrado" : "Digite o ISBN do livro"}</h2>
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
          <button type="button" className="btnBuscaIsbn" onClick={handleGetLivro}>
            Verificar
          </button>
        )}

        {selectedLivro && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <img src={selectedLivro.caminhoImagem} alt={selectedLivro.titulo} style={{ width: "100%" }} />
              </div>
              <div className="col-md">
                <div className="modal-text">{selectedLivro.descricao}</div>
                <div className="modal-text">Autor: {selectedLivro.autores?.nomeAutor || "Autor do livro"}</div>
                <div className="modal-text">Gênero: {selectedLivro.generos?.nomegenero || "Gênero do livro"}</div>
                <div className="modal-text">Editora: {selectedLivro.editoras?.nomeEditora || "Editora do livro"}</div>
                <div className="modal-text">ISBN: {selectedLivro.isbn}</div>
              </div>
            </div>

            <button type="button" className="btnRetornar" onClick={() => {
              setSelectedLivro(null);
              setISBN("");
            }}>
              Retornar à busca
            </button>

            <button type="button" className="btnVoltarInicio" onClick={() => {
              navigate("/");
            }}>
              Voltar ao acervo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
