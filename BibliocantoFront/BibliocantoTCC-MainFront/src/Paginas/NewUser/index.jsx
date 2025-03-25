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
                alert(response.data);
                navigate('/login');
            } else {
                alert('Usuário já cadastrado no sistema!');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            alert('Erro ao criar usuário. Tente novamente.');
        }
    }

    return (
        <div className='Criar-container'>
            <section className='formCriarUser'>

                <h1 className='h1TituloCriar'>Bibliocanto</h1>

                <form onSubmit={createLogin}>
                    <h2>Criar Usuário</h2>

                    <input
                        name='email'
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        name='password'
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

                    <button className="buttonCriarUser" type='submit'>Criar</button>
                </form>
            </section>
        </div>
    );
}
