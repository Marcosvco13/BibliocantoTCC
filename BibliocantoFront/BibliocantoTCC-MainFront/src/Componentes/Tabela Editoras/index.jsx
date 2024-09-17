export default function Editoras({ editoras, onEdit }) {
    return (
        <>
            {editoras.map((editora) => (
                <tr key={editora.id}>
                    <td>{editora.id}</td>
                    <td>{editora.nomeEditora}</td>
                    <td>
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => onEdit(editora.id)}
                        >
                            Editar
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}