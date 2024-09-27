import api from '../../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';


export default function BuscaLivroIsbn () {
    
    const [isbn, setISBN] = useState('');

    const navigate = useNavigate();

    const handleGetLivro = async (e) => {
        e.preventDefault();

        const isbnData = { isbn };

        const verificaIsbn = /^\d{3}-\d{10}$/; 

        if (!verificaIsbn.test(isbn)) {  // Se não tiver 14 dígitos
            alert("ISBN inválido");  // Exibe o alerta
            return;  // Sai da função se o ISBN for inválido
        }

        try {
            
            const response = await api.get('/api/Livros/GetLivroByIsbn', {params:  isbnData });

            if(response != null){
                alert("Livro já existe no sistema!");
                return;
            }
            
        } catch {
            alert("Livro não encontrado no sistema!");
            navigate("/CadastrarLivro")
        }
    };

    const handleInputChange = (e) => {
        let valor = e.target.value.replace(/\D/g, '');
    
        if (valor.length > 3) {
            valor = valor.substring(0, 3) + '-' + valor.substring(3);
        }
    
        setISBN(valor);
    };
    

    return (
        <div className='divBuscaIsbn'>
            
            <div className='divTituloBuscaIsbn'>
                <h2>Digite o ISBN do livro</h2>
            </div>
            
            <div className='formBuscaIsbn'>  
                
                <div className='divInputBuscaIsbn'>
                    <input 
                        className='isbnBusca'
                        type="text" 
                        placeholder='ISBN'
                        value={isbn}
                        onChange={(e) => handleInputChange(e)} 
                        maxLength={14}
                        required
                    />

                </div>
                
                <button type='button' className='btnBuscaIsbn' onClick={handleGetLivro}>Verificar</button>

            </div>

        </div>
    );

}