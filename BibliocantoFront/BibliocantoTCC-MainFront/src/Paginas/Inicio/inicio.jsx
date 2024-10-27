import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './Inicio.css'; // Caso você tenha um CSS específico para o componente

const Inicio = () => {
  const [livrosPorGenero, setLivrosPorGenero] = useState({});
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const fetchLivrosEGeneros = async () => {
    try {
      const livrosResponse = await axios.get('http://localhost:5162/api/Livros');
      const livros = livrosResponse.data;

      // Verifica se livros foram retornados
      if (!livros || livros.length === 0) {
        setError('Nenhum livro encontrado.');
        return;
      }

      const tempLivrosPorGenero = {};

      await Promise.all(livros.map(async (livro) => {
        const generosResponse = await axios.get(`http://localhost:5162/api/GenerosLivro/${livro.id}`);
        const generos = generosResponse.data;

        // Adiciona o livro ao gênero apropriado
        generos.forEach(genero => {
          const nomeGenero = genero.nomegenero; // Assume que o nome do gênero é retornado na resposta
          if (!tempLivrosPorGenero[nomeGenero]) {
            tempLivrosPorGenero[nomeGenero] = [];
          }
          tempLivrosPorGenero[nomeGenero].push(livro);
        });
      }));

      // Atualiza o estado com os livros organizados por gênero
      setLivrosPorGenero(tempLivrosPorGenero);
    } catch (error) {
      console.error('Erro ao carregar livros por gênero:', error);
      setError('Erro ao carregar livros.');
    }
  };

  useEffect(() => {
    fetchLivrosEGeneros();
  }, []);

  const handleImageClick = (livro) => {
    setSelectedLivro(livro);
    setModalVisible(true);
  };

  return (
    <div>
      <h1>Livros por Gênero</h1>
      {error && <p className="error">{error}</p>}
      {Object.keys(livrosPorGenero).length > 0 ? (
        Object.keys(livrosPorGenero).map((genero) => (
          <div key={genero}>
            <h2>{genero}</h2>
            <div className="linha-card">
              {livrosPorGenero[genero].map((livro) => (
                <img
                  key={livro.id}
                  src={livro.caminhoImagem}
                  alt={livro.titulo}
                  className="livro-card"
                  onClick={() => handleImageClick(livro)} // Abre o modal ao clicar na imagem
                  style={{ cursor: 'pointer', width: '100px', margin: '10px' }} // Defina a largura e margens conforme necessário
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Carregando livros...</p>
      )}

      {/* Modal para exibir informações do livro */}
      <Modal show={modalVisible} onHide={() => setModalVisible(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLivro ? selectedLivro.titulo : "Livro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLivro && (
            <div>
              <img src={selectedLivro.caminhoImagem} alt={selectedLivro.titulo} style={{ width: '100%' }} />
              <p>{selectedLivro.descricao}</p>
              <p>Autor: {selectedLivro.autores?.nomeAutor || "Autor do livro"}</p>
              <p>Gênero: {selectedLivro.generos?.join(', ') || "Gênero do livro"}</p>
              <p>Editora: {selectedLivro.editoras?.nomeEditora || "Editora do livro"}</p>
              <p>ISBN: {selectedLivro.isbn}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Inicio;