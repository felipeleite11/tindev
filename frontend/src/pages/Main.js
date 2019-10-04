import React, { useEffect, useState } from 'react'
import './Main.css'
import logo from '../assets/logo.png'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Main({ match }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    userid: match.params.id
                }
            })

            setUsers(response.data)
        }
        loadUsers()
    }, [match.params.id])

    async function handleLike(targetId) {
        await api.post(`/devs/${targetId}/likes`, null, {
            headers: {
                userid: match.params.id
            }
        })

        setUsers(users.filter(user => user._id !== targetId))
    }

    async function handleDislike(targetId) {
        await api.post(`/devs/${targetId}/dislikes`, null, {
            headers: {
                userid: match.params.id
            }
        })

        setUsers(users.filter(user => user._id !== targetId))
    }

    return (
        <div className='main-container container'>
            <Link to='/'>
                <img src={logo} alt='Logo' id='logo' />
            </Link>

            { users.length ? (
                <ul className='row' id='profile-list'>
                    {
                        users.map(user => (
                            <li className='card col s12 m4 l3 hvr-pop' key={user._id}>
                                <div className='card-content'>
                                    <img src={user.avatar} alt={user.name} />
                                    
                                    <footer>
                                        <strong>{user.name}</strong>
                                        <p>{user.bio}</p>
                                    </footer>
                                    <div className='buttons row'>
                                        <button type='button' className='col s5 btn red' onClick={() => handleDislike(user._id)}>
                                            <i className='fa fa-times'></i>
                                        </button>
                                        <button type='button' className='col s5 offset-s2 btn green' onClick={() => handleLike(user._id)}>
                                            <i className='fa fa-check'></i>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            ) : (
                <div className='empty'>Acabou =(</div>
            ) }

        </div>
    )
}