import api from '../../services/api';
import { useState } from 'react';
import './CadAutorStyle.css';
import { useNavigate } from 'react-router-dom';

export default function CadAutor() {

    const [nomeAutor, setNomeAutor] = useState('');

    const navigate = useNavigate();

    const handleCadAutor = async (e) => {
        e.preventDefault();
    
        const autorData = { nomeAutor };
    
        try {
            const response = await api.cadastrarAutor(autorData);
            console.log('Autor cadastrado com sucesso:', response);
    
            setNomeAutor(''); // Limpa o campo nome após o cadastro
    
        } catch (error) {
            console.error('Erro ao cadastrar o autor:', error);
        }
    };

    return (
        <div className="Container">
            <br />
            <h2>Cadastrar Autor</h2>
            <br />

            <div className="jumbotron jumbotron-custom">
                
                <button className="btn btn-secondary" onClick={() => navigate('/CadastrarLivro')}>
                    ← Voltar
                </button>

                <form onSubmit={handleCadAutor}>
                    
                    <div className='row'>                      
                        <div className='col-4'>
                            <label>Autor</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                placeholder='Nome do Autor'
                                value={nomeAutor}
                                onChange={(e) => setNomeAutor(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <br />

                    <button type="submit" className='btn btn-success btn-lg btn-block'>
                        Cadastrar
                    </button>

                </form>

            </div>
        </div>
    );
}