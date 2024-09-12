function Livro({ livros, onDelete, onEdit }) {
    return (
        <>
            {livros.map((livro) => (
                <tr key={livro.id}>
                    <td>{livro.id}</td>
                    <td>{livro.titulo}</td>
                    <td>{livro.autores?.nomeAutor}</td>
                    <td>{livro.generos?.nomegenero}</td>
                    <td>{livro.isbn}</td>
                    <td>{livro.descricao}</td>
                    <td>{livro.editoras?.nomeEditora}</td>
                    <td>{livro.caminhoImagem}</td>
                    <td>
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => onEdit(livro.id)}
                        >
                            Editar
                        </button>
                        <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => onDelete(livro.id)}
                        >
                            Excluir
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default Livro;