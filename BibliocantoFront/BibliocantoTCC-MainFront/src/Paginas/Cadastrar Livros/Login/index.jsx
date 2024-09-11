import React, {useState} from 'react';
import './styles.css';
import logo from '../../../assets/BibliocantoTCC-mainlogo.png';
import api from '../../../services/api';
import {useNavigate} from 'react-router-dom';

export default function Login(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useNavigate();

    async function login(event){
        event.preventDefault();
    
        const data = {
            email, password
        };
    
        try{
            
            const response = await api.post('/api/Account/LoginUser', data);
    
            console.log(response);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);
    
            history('/');
            window.location.reload();
    
        }catch(error){
            alert('O login falhou ' + error)
        }
    };

    return(
        <div className='login-container'>
            <section className='form'>
                <img src={logo} alt="login" id='imgLogo'/>
                <form onSubmit={login}>
                    <h1>Login do Usuário</h1>
                    
                    <input placeholder='Email' 
                        value={email} onChange={e=>setEmail(e.target.value)}
                    />
                    
                    <input type="password" placeholder='Password' 
                        value={password} onChange={e=>setPassword(e.target.value)}
                    />
                    
                    <button class="button" type='submit'>Login</button>
                </form>
            </section>
        </div>
    )
}