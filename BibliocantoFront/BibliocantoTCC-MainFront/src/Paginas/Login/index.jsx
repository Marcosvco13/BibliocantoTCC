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

            //console.log(response);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);
            
            try{
                
                const responseId = await api.get('/api/Account/IdUserByEmail', {
                    params: {
                      email: email,
                    },
                });
                
                localStorage.setItem('Id', responseId.data.id);
                
            }catch (erroe){
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

    return (
        <div className='login-container'>
            <section className='form'>
                <img src={logo} alt="login" id='imgLogo' />
                <form onSubmit={login}>
                    <h1>Login do Usuário</h1>

                    <input 
                        placeholder='Email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    
                    <button className="button" type='submit'>Login</button>
                </form>
                
                <br/>

                <h4>Ou</h4>
                <hr color='white'></hr>

                <div className='NewUser-container'>
                    <button className="button" type="button" onClick={handleCreateUser}>Criar Usuário</button>
                </div>

            </section>
        </div>
    );
}
