import api from '../../services/api';
import Editora from '../../Componentes/Tabela Editoras/index';
import { useState, useEffect } from 'react';
import './CadEditoraStyle.css';
import { useNavigate } from 'react-router-dom';

export default function CadEditora() {

    const [nomeEditora, setNomeEditora] = useState('');
    const [editoras, setEditoras] = useState([]);
    const [editoraEditando, setEditoraEditando] = useState(null);

    useEffect(() => {
        api.getEditoras(setEditoras);
    }, []);

    const navigate = useNavigate();

    const handleCadEditora = async (e) => {
        e.preventDefault();
    
        const editoraData = { nomeEditora };
    
        try {
            if(editoraEditando){
                await api.putEditora(editoraEditando.id, editoraData);
                console.log('Editora atualizada com sucesso!');
            }else{
                const response = await api.cadastrarEditora(editoraData);
                console.log('Editora cadastrada com sucesso:', response);
            }
    
            resetForm();
            api.getEditoras(setEditoras);
    
        } catch (error) {
            console.error('Erro ao cadastrar a editora:', error);
        }
    };

    const handleEdit = (id) => {
        const editoraSelecionada = editoras.find((editora) => editora.id === id);
        
        if (!editoraSelecionada) {
            console.error("Editora não encontrado!");
            return;
        }

        setEditoraEditando(editoraSelecionada);
        setNomeEditora(editoraSelecionada.nomeEditora);
    };

    const resetForm = () => {
        setNomeEditora('');
        setEditoraEditando(null);
    };

    return (
        <div className="containerCadEditora">
            
            <div className='divTituloCadEditora'>
                <h2 className='tituloCadEditora'>Cadastrar Editora</h2>
            </div>
            
            <div className="formularioCadEditora">
                
                <div className='divBtnVoltarCadEditora'>
                    <button className="btnVoltarCadEditora" onClick={() => navigate('/CadastrarLivro')}>
                        ← Voltar
                    </button>
                </div>

                <form onSubmit={handleCadEditora}>
                    
                    <div className='linhaCadEditora'>                      
                        <div className='colunaCadEditora'>

                            <div className='tituloCadEditora'>
                                <label>Nome da Editora</label>
                            </div>

                            <div className='inputBtnCadEditora'>

                                <input 
                                    type="text" 
                                    className='inputNomeCadEditora' 
                                    placeholder='Nome da Editora'
                                    value={nomeEditora}
                                    onChange={(e) => setNomeEditora(e.target.value)} 
                                    required
                                />

                                <button type="submit" className='btnCadEditora'>
                                    {editoraEditando ? "Salvar Alterações" : "Cadastrar"}
                                </button>

                                {editoraEditando && (
                                    <button
                                        type="button"
                                        className="btnCadAutorCancela"
                                        onClick={resetForm}
                                    >
                                        Cancelar Edição
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>

                </form>
                <div className='divTabCadEditora'>
                    <table className="tableCadEditora">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome da Editora</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Editora editoras={editoras} onEdit={handleEdit}/>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}