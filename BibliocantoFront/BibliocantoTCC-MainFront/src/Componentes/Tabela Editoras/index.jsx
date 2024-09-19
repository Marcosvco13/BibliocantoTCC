import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './style.css'

export default function Editoras({ editoras, onEdit }) {
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
                    </td>
                </tr>
            ))}
        </>
    );
}