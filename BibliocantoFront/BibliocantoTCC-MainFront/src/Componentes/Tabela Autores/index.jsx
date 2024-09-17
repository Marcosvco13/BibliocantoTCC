export default function Autores({ autores, onEdit }) {
    return (
        <>
            {autores.map((autor) => (
                <tr key={autor.id}>
                    <td>{autor.id}</td>
                    <td>{autor.nomeAutor}</td>
                    <td>
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => onEdit(autor.id)}
                        >
                            Editar
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}