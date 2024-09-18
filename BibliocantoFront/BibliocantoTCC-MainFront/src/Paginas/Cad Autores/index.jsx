import api from '../../services/api';
import Autor from '../../Componentes/Tabela Autores/index';
import { useState, useEffect } from 'react';
import './CadAutorStyle.css';
import { useNavigate } from 'react-router-dom';

export default function CadAutor() {
    const [nomeAutor, setNomeAutor] = useState('');
    const [autores, setAutores] = useState([]);
    const [autorEditando, setAutorEditando] = useState(null); // Estado para o autor sendo editado

    useEffect(() => {
        api.getAutores(setAutores);
    }, []);

    const navigate = useNavigate();

    // Função para cadastrar ou editar autor
    const handleCadAutor = async (e) => {
        e.preventDefault();

        const autorData = { nomeAutor };

        try {
            if (autorEditando) {
                // Editar autor existente
                await api.putAutor(autorEditando.id, autorData);
                console.log('Autor atualizado com sucesso!');
            } else {
                // Cadastrar novo autor
                const response = await api.cadastrarAutor(autorData);
                console.log('Autor cadastrado com sucesso:', response);
            }

            // Limpar formulário
            resetForm();
            api.getAutores(setAutores); // Atualizar lista de autores
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
        setNomeAutor(autorSelecionado.nomeAutor); // Preencher o formulário com o nome do autor
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setNomeAutor('');
        setAutorEditando(null); // Resetar o estado de edição
    };

    return (
        <div className="container">
            <div className='divTitulo'>
                <h2 className='titulo'>{autorEditando ? "Editar Autor" : "Cadastrar Autor"}</h2>
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
                        {autorEditando ? "Salvar Alterações" : "Cadastrar"}
                    </button>
                    {autorEditando && (
                        <button
                            type="button"
                            className="btn btn-secondary btn-lg btn-block"
                            onClick={resetForm}
                        >
                            Cancelar Edição
                        </button>
                    )}
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
                            <Autor autores={autores} onEdit={handleEdit} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
