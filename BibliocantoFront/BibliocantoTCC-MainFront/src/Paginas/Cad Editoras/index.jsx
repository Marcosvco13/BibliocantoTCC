import api from '../../services/api';
import Editora from '../../Componentes/Tabela Editoras/index';
import { useState, useEffect } from 'react';
import './CadEditoraStyle.css';
import { useNavigate } from 'react-router-dom';

export default function CadEditora() {

    const [nomeEditora, setNomeEditora] = useState('');

    const [editoras, setEditoras] = useState([]);

    useEffect(() => {
        api.getEditoras(setEditoras);
    }, []);

    const navigate = useNavigate();

    const handleCadEditora = async (e) => {
        e.preventDefault();
    
        const editoraData = { nomeEditora };
    
        try {
            const response = await api.cadastrarEditora(editoraData);
            console.log('Editora cadastrada com sucesso:', response);
    
            setNomeEditora(''); // Limpa o campo nome após o cadastro

            window.location.reload();
    
        } catch (error) {
            console.error('Erro ao cadastrar a editora:', error);
        }
    };

    return (
        <div className="container">
            
            <div className='divTitulo'>
                <h2 className='titulo'>Cadastrar Editora</h2>
            </div>
            
            <div className="formulario">
                
                <div className='divBtnVoltarAutor'>
                    <button className="btnVoltarAutor" onClick={() => navigate('/CadastrarLivro')}>
                        ← Voltar
                    </button>
                </div>

                <form onSubmit={handleCadEditora}>
                    
                    <div className='linha'>                      
                        <div className='coluna'>

                            <div className='tituloAutor'>
                                <label>Nome da Editora</label>
                            </div>

                            <input 
                                type="text" 
                                className='inputNome' 
                                placeholder='Nome da Editora'
                                value={nomeEditora}
                                onChange={(e) => setNomeEditora(e.target.value)} 
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
                                <th scope="col">Nome da Editora</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Editora editoras={editoras}/>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}