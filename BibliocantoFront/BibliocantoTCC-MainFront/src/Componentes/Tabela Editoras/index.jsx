import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export default function Editoras({ editoras, onEdit, onDelete }) {
    return (
        <>
            {editoras.map((editora) => (
                <tr key={editora.id}>
                    <td>{editora.id}</td>
                    <td>{editora.nomeEditora}</td>
                    <td>
                        <button 
                            className="btnEditaTabEditoras" 
                            onClick={() => onEdit(editora.id)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button 
                            className="btnExcluiTabEditoras" 
                            onClick={() => onDelete(editora.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}