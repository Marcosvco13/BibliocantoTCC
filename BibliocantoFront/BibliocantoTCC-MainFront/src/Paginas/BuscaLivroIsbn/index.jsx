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

        try {
            
            const response = await api.get('/api/Livros/GetLivroByIsbn', {params:  isbnData });

            if(response != null){
                alert("Livro já existe no sistema!");
                

                
            }else {
                //tela de cadastro buscando as informações da api com o isbn informado
                navigate()
            }
            
        } catch (error) {

            console.error('Erro ao buscar o livro:', error);

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
                        placeholder='ISBN-13'
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