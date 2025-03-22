import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./Recomendacao.css";

const Recomendacao = ({ IdsLivroAutor }) => {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const livrosRecomendados = await Promise.all(
                    IdsLivroAutor.map(async (id) => {
                        const livro = await api.getLivroById(id);
                        return livro;
                    })
                );

                // Removendo livros duplicados com base no ID
                const livrosUnicos = livrosRecomendados.filter(
                    (livro, index, self) =>
                        index === self.findIndex((l) => l.id === livro.id)
                );

                setLivros(livrosUnicos);
            } catch (error) {
                console.error("Erro ao buscar livros recomendados:", error);
            }
        };

        if (IdsLivroAutor.length > 0) {
            fetchLivros();
        }
    }, [IdsLivroAutor]);

    return (
        <div className="recomendacoes-container">
            <h2>Recomendações</h2>
            <div className="livros-grid">
                {livros.map((livro) => (
                    <div key={livro.id} className="livro-card">
                        <img src={livro.caminhoImagem} alt={livro.titulo} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recomendacao;