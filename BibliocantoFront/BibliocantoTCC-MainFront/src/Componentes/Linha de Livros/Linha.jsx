import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./Linha.css";

function Linha() {
  const [livros, setLivros] = useState([]);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    api.getLivros(setLivros);
    api.getGeneros(setGeneros);
  }, []);

  // Função para agrupar livros por gênero
  const livrosPorGenero = generos.map((genero) => {
    return {
      ...genero,
      livros: livros.filter((livro) =>
        livro.generos.nomegenero === genero.nomegenero
      ),
    };
  });
  

  return (
    <div className="linha-container">
      {livrosPorGenero.map((genero) => (
        <div key={genero.id} className="genero">
          <h3 className="linha-titulo">{genero.nomegenero}</h3>
          <div className="linha-card">
            {genero.livros.length > 0 ? (
              genero.livros.map((livro) => (
                <img
                  className="livro-card"
                  key={livro.id}
                  src={livro.caminhoImagem}
                  alt={livro.titulo}
                />
              ))
            ) : (
              <p>Nenhum livro disponível neste gênero.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


export default Linha;
