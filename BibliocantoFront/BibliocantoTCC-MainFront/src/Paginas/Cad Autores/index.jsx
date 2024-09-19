import api from '../../services/api';
import Autor from '../../Componentes/Tabela Autores/index';
import { useState, useEffect } from 'react';
import './CadAutorStyle.css';
import { useNavigate } from 'react-router-dom';

export default function CadAutor() {
    const [nomeAutor, setNomeAutor] = useState('');
    const [autores, setAutores] = useState([]);
    const [autorEditando, setAutorEditando] = useState(null);

    useEffect(() => {
        api.getAutores(setAutores);
    }, []);

    const navigate = useNavigate();

    const handleCadAutor = async (e) => {
        e.preventDefault();

        const autorData = { nomeAutor };

        try {
            if (autorEditando) {
                await api.putAutor(autorEditando.id, autorData);
                console.log('Autor atualizado com sucesso!');
            } else {
                const response = await api.cadastrarAutor(autorData);
                console.log('Autor cadastrado com sucesso:', response);
            }

            resetForm();
            api.getAutores(setAutores);
        } catch (error) {
            console.error('Erro ao cadastrar ou editar o autor:', error);
        }
    };

    // Função para editar um autor selecionado
    const handleEdit = (id) => {
        const autorSelecionado = autores.find((autor) => autor.id === id);
        
        if (!autorSelecionado) {
            console.error("Autor não encontrado!");
            return;
        }

        setAutorEditando(autorSelecionado);
        setNomeAutor(autorSelecionado.nomeAutor);
    };


    const resetForm = () => {
        setNomeAutor('');
        setAutorEditando(null);
    };

    return (
        <div className="containerCadAutor">
            <div className='divTituloCadAutor'>
                <h2 className='tituloCadAutor'>{autorEditando ? "Editar Autor" : "Cadastrar Autor"}</h2>
            </div>
            
            <div className="formularioCadAutor">
                <div className='divBtnVoltarCadAutor'>
                    <button className="btnVoltarCadAutor" onClick={() => navigate('/CadastrarLivro')}>
                        ← Voltar
                    </button>
                </div>

                <form onSubmit={handleCadAutor}>
                    
                    <div className='linhaCadAutor'>
                        <div className='colunaCadAutor'>
                            
                            <div className='tituloAutor'>
                                <label>Nome do Autor</label>
                            </div>
                            
                            <div className='inputBtnCadAutor'>
                                <input 
                                    type="text" 
                                    className='inputNomeCadAutor' 
                                    placeholder='Nome do Autor'
                                    value={nomeAutor}
                                    onChange={(e) => setNomeAutor(e.target.value)} 
                                    required
                                />

                                <button type="submit" className='btnCadAutor'>
                                    {autorEditando ? "Salvar Alterações" : "Cadastrar"}
                                </button>

                                {autorEditando && (
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

                <div className='divTabCadAutor'>
                    <table className="tabelaCadAutor">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome do Autor</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Autor autores={autores} onEdit={handleEdit} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
