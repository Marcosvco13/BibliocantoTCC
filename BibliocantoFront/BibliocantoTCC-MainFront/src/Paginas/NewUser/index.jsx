import React, { useState } from 'react';
import './styles.css';
import logo from '../../assets/BibliocantoTCC-mainlogo.png';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/index';

export default function NewUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    async function createLogin(event) {
        event.preventDefault();

        // Form validation
        const data = { email, password, confirmPassword };

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        // Validate password complexity
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        // Check if email is already registered
        try {
            const verificaEmail = await api.get('/api/Account/UserByEmail', {
                params: { email }
            });

            if (!verificaEmail.data) {

                const response = await api.post('/api/Account/CreateUser', data);
                
                console.log(response);

                const loginResponse = await api.post('/api/Account/LoginUser', {
                    email,
                    password
                });

                if (loginResponse.data) {
                    console.log('User logged in successfully:', loginResponse.data);

                    localStorage.setItem('email', email);
                    localStorage.setItem('token', loginResponse.data.token);
                    localStorage.setItem('expiration', loginResponse.data.expiration);

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
                } else {
                    alert('Erro ao efetuar o login. Tente novamente.');
                }

            } else {
                alert('Usuário já cadastrado no sistema!');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            alert('Erro ao criar usuário. Tente novamente.');
        }
    }

    return (
        <div className='login-container'>
            <section className='form'>
                <img src={logo} alt="login" id='imgLogo' />
                <form onSubmit={createLogin}>
                    <h1>Criar Usuário</h1>

                    <input
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder='Senha'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder='Confirme a senha'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />

                    <button className="button" type='submit'>Criar</button>
                </form>
            </section>
        </div>
    );
}
