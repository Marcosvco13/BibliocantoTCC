import React from 'react';

const Livro = ({ livros }) => {
    return (
        <>
            {livros.map(livro => (
                <tr key={livro.id}>
                    <th scope="row">{livro.id}</th>
                    <td>{livro.titulo}</td>
                    <td>{livro.autores.nomeAutor}</td>
                    <td>{livro.generos.nomegenero}</td>
                </tr>
            ))}
        </>
    );
}

export default Livro;