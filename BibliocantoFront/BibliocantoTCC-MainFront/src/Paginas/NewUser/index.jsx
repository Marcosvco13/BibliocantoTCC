import React, {useState} from 'react';
import './styles.css';
import logo from '../../assets/BibliocantoTCC-mainlogo.png';
import api from '../../services/api';
import {useNavigate} from 'react-router-dom';

export default function NewUser(){
    
    const [apelido, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    async function createLogin(event){
        event.preventDefault();
    
        const data = {
            apelido, email, password, confirmPassword
        };

        try{
            const verificaEmail = await api.post('/api/Account/UserByEmail', email);

            if(verificaEmail == false){
                const response = await api.post('/api/Account/CreateUser', data);

                console.log(response);
    
                navigate('/Login');
                window.location.reload();
            }else{
                alert('Usuário já cadastrado no sistema!')
            }

        }catch(error){
            alert('Erro ao criar usuário: ' + error)
        }
    };
    
    return(
        <div className='login-container'>
            <section className='form'>
                <img src={logo} alt="login" id='imgLogo'/>
                <form onSubmit={createLogin}>
                    <h1>Criar Usuário</h1>
                    
                    <input placeholder='Apelido' 
                        value={apelido} 
                        onChange={e=>setUserName(e.target.value)}
                        maxLength={256}
                    />

                    <input placeholder='E-mail' 
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}
                    />
                    
                    <input type="password" placeholder='Senha' 
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                    />

                    <input type="password" placeholder='Confirme a senha' 
                        value={confirmPassword} 
                        onChange={e=>setConfirmPassword(e.target.value)}
                    />
                    
                    <button class="button" type='submit'>Criar</button>
                </form>
            </section>
        </div>
    )
}