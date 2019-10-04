import React, { useState } from 'react'
import './Login.css'
import logo from '../assets/logo.png'
import api from '../services/api'

export default function Login({ history }) {

    const [username , setUsername] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await api.post('/devs', { username })

        const { _id } = response.data

        history.push(`./dev/${_id}`)
    }

    return (
        <div className='container'>
            <div className='row' style={{marginTop: '15%'}}>
                <div className='card col s12 m6 offset-m3'>
                    <div className="login-container card-content">
                        <form onSubmit={handleSubmit}>
                            <p align='center'>
                                <img src={logo} alt='Logo' />
                            </p>
                            <input 
                                placeholder='Digite o usuário Github' 
                                value={username} 
                                onChange={e => setUsername(e.target.value)}
                            />
                            <button type='submit'>
                                <i className='fa fa-sign-in' style={{marginRight: '10px'}}></i>
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}