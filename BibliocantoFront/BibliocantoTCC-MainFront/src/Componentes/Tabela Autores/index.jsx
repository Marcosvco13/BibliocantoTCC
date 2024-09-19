import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './style.css'


export default function Autores({ autores, onEdit }) {
    return (
        <>
            {autores.map((autor) => (
                <tr key={autor.id}>
                    <td>{autor.id}</td>
                    <td>{autor.nomeAutor}</td>
                    <td>
                        <button 
                            className="btnEditaTabAutor" 
                            onClick={() => onEdit(autor.id)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}