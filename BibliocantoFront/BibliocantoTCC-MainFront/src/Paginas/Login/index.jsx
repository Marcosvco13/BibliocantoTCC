import React, { useState } from 'react';
import './styles.css';
import logo from '../../assets/BibliocantoTCC-mainlogo.png';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

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
                alert('O login falhou ' + error);
            }
            
            navigate('/');
            window.location.reload();
        } catch (error) {
            alert('O login falhou ' + error);
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
                {/* <img src={logo} alt="login" id='imgLogo' /> */}
                
                <h1 className='h1NomeProjeto'>Bibliocanto</h1>

                <form onSubmit={login}>
                    
                    <h2>Login do Usuário</h2>

                    <input 
                        placeholder='Email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    
                    <input 
                        type="password" 
                        placeholder='Senha' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />

                    <button className="buttonLogin" type='submit'>Entrar</button>

                </form>

                <form>
                <button className="google-button" onClick={handleGoogleLogin}>
                        Entrar com Google
                    </button>

                    <a href="#" onClick={handleForgotPassword} className="forgot-password">
                        Esqueceu a senha?
                    </a>
                </form>
                
                <br/>
                <h4 className='h4Login'>Ou</h4>
                <hr className='hrLogin'></hr>

                <div className='NewUser-container'>
                    <button className="buttonCriar" onClick={handleCreateUser}>
                        Criar Usuário
                    </button>
                </div>

            </section>
        </div>
    );
}
