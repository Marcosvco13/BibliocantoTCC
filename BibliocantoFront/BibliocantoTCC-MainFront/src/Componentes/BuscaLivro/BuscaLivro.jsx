import { useState, useEffect } from "react";
import "./BuscaLivro.css";
import api from "../../services/api";

const BuscaLivro = ({ onResultado, onBuscaAtiva  }) => {
  const [termo, setTermo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!termo.trim()) {
      onResultado([]);
      return;
    }

    const timer = setTimeout(async () => {
      onBuscaAtiva(true);
      setCarregando(true);
      setErro(null);

      try {
        const dados = await api.getLivroByNomeLivro(termo);
        onResultado(dados);
      } catch (error) {
        setErro("Erro ao buscar o livro. Tente novamente.");
      } finally {
        setCarregando(false);
        onBuscaAtiva(false);
      }
    }, 500); // Aguarda 500ms antes de buscar

    return () => clearTimeout(timer);
  }, [termo, onResultado, onBuscaAtiva]);

  return (
    <div className="busca-container">
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
  );
};

export default BuscaLivro;