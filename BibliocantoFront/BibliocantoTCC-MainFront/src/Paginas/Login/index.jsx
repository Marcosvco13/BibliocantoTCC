import React, { useState } from 'react';
import './styles.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();

        const data = { email, password };

        try {
            const response = await api.post('/api/Account/LoginUser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);
            
            try {
                const responseId = await api.get('/api/Account/IdUserByEmail', {
                    params: { email: email },
                });
                localStorage.setItem('Id', responseId.data.id);
            } catch (error) {
                alert(`Erro ao buscar ID do usuário: ${error.message}`);
                return; // Importante: encerra a função se falhar
            }
            
            navigate('/');
            window.location.reload();
        } catch (error) {
            let errorMessage = 'Erro desconhecido. Tente novamente.';

            console.log(error);
            
            if (error instanceof AxiosError && error.response) {
                // Se a API retornar uma mensagem de erro, usa ela
                errorMessage = error.response.data || 'Erro na autenticação';
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            alert(`Falha no login: ${errorMessage}`); // Alert corrigido
            console.error("Erro completo:", error); // Para debug
        }
    };

    // Função para redirecionar para a página de criação de usuário
    const handleCreateUser = () => {
        navigate('/NewUser');
    };

    // Função para redirecionar para a página de recuperação de senha
    const handleForgotPassword = () => {
        alert("Função de redefinir senha ainda não implementado!");
    };

    // Simulação de login com o Google
    const handleGoogleLogin = () => {
        alert("Login com o Google ainda não implementado!");
    };

    return (
        <div className='login-container'>
          <section className='form'>
            <h1 className='h1NomeProjeto'>Bibliocanto</h1>
    
            <form onSubmit={login}>
              <input 
                name='email'
                placeholder='Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              
              <input 

                type="password" 
                placeholder='Senha' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
    
              <button className="buttonLogin" type='submit'>Entrar</button>
            </form>
    
            <button className="google-button" onClick={handleGoogleLogin}>
              Entrar com Google
            </button>
    
            <div className='login-options'>
              <a href="#" onClick={handleForgotPassword} className="forgot-password">
                Esqueceu a senha?
              </a>
              <span className="divider">Ou</span>
              <button onClick={handleCreateUser} className="create-account">
                Criar Usuário
              </button>
            </div>
          </section>
        </div>
      );
}
