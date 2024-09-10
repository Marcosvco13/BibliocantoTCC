import React from 'react';
import './styles.css';
import logo from '../../../assets/BibliocantoTCC-mainlogo.png'

export default function Login(){
    return(
        <div className='login-container'>
            <section className='form'>
                <img src={logo} alt="login" id='imgLogo'/>
                <form>
                    <h1>Login do Usuário</h1>
                    <input placeholder='Email'/>
                    <input type="password" placeholder='Password'/>
                    <button class="button" type='submit'>Login</button>
                </form>
            </section>
        </div>
    )
}