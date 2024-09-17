import api from '../../services/api';
import Autor from '../../Componentes/Tabela Autores/index';
import { useState, useEffect } from 'react';
import './CadAutorStyle.css';
import { useNavigate } from 'react-router-dom';

export default function CadAutor() {

    const [nomeAutor, setNomeAutor] = useState('');

    const [autores, setAutores] = useState([]);

    useEffect(() => {
        api.getAutores(setAutores);
    }, []);

    const navigate = useNavigate();

    const handleCadAutor = async (e) => {
        e.preventDefault();
    
        const autorData = { nomeAutor };
    
        try {
            const response = await api.cadastrarAutor(autorData);
            console.log('Autor cadastrado com sucesso:', response);
    
            setNomeAutor(''); // Limpa o campo nome após o cadastro

            window.location.reload();
    
        } catch (error) {
            console.error('Erro ao cadastrar o autor:', error);
        }
    };

    return (
        <div className="container">
            
            <div className='divTitulo'>
                <h2 className='titulo'>Cadastrar Autor</h2>
            </div>
            
            <div className="formulario">
                
                <div className='divBtnVoltarAutor'>
                    <button className="btnVoltarAutor" onClick={() => navigate('/CadastrarLivro')}>
                        ← Voltar
                    </button>
                </div>

               

                <form onSubmit={handleCadAutor}>
                    
                    <div className='linha'>                      
                        <div className='coluna'>

                            <div className='tituloAutor'>
                                <label>Nome do Autor</label>
                            </div>

                            <input 
                                type="text" 
                                className='inputNome' 
                                placeholder='Nome do Autor'
                                value={nomeAutor}
                                onChange={(e) => setNomeAutor(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <br />

                    <button type="submit" className='btnCadAutor btn-lg btn-block'>
                        Cadastrar
                    </button>
                </form>
                <div className='divTabAutor'>
                    <table className="table table-hover table-dark table-custom">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome do Autor</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Autor autores={autores}/>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}