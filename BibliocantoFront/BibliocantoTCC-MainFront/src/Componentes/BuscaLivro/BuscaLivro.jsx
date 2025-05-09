import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./BuscaLivro.css";
import api from "../../services/api";

const BuscaLivro = ({ onResultado }) => {
  const [termo, setTermo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [generos, setGeneros] = useState([]);
  const [mostrarSubfiltro, setMostrarSubfiltro] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!termo.trim()) {
      onResultado([]);
      return;
    }

    const timer = setTimeout(async () => {
      setCarregando(true);
      setErro(null);

      try {
        const dados = await api.getLivroByNomeLivro(termo);
        onResultado(dados);
      } catch (error) {
        setErro("Erro ao buscar o livro. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [termo, onResultado]);

  const carregarGeneros = async () => {
    try {
      const lista = await api.getGeneros();
      setGeneros(lista);
    } catch (error) {
      console.error("Erro ao carregar os gêneros");
    }
  };

  const handleGeneroHover = () => {
    setMostrarSubfiltro(true);
    if (generos.length === 0) {
      carregarGeneros();
    }
  };

  return (
    <div className="busca-container">

      {location.pathname === '/' && (
      <div className="busca-input-group">
        <input
          type="text"
          className="busca-input"
          placeholder="Buscar livro pelo nome"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
        />
        {carregando && <p className="busca-status">Buscando...</p>}
        {erro && <p className="busca-erro">{erro}</p>}
      </div>
      )}

      <div className="filtro-input-group">
        <button
          className="FiltrarLivrosBtn"
          onClick={() => setMostrarFiltros((prev) => !prev)}
        >
          <i className="bi bi-funnel"></i>
        </button>

        {mostrarFiltros && (
  <div className="filtro-opcoes">
    
    <div
      className="genero-wrapper"
      onMouseEnter={handleGeneroHover}
      onMouseLeave={() => setMostrarSubfiltro(false)}
    >
      <div className="filtro-item genero-item">
        Gêneros
      </div>

      {mostrarSubfiltro && (
        <div className="subfiltro-generos">
          {generos.map((genero) => (
            <div
              key={genero.id}
              className="subfiltro-item"
              onClick={() => navigate(`/LivrosPorGenero/${genero.id}`)}
            >
              {genero.nomegenero}
            </div>
          ))}
        </div>
      )}
    </div>

    <div
      className="filtro-item editora-item"
      onClick={() => navigate("/LivrosPorEditora")}
    >
      Editoras
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default BuscaLivro;
