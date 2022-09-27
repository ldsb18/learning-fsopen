import { useState } from 'react'

import loginService from '../services/login'
import noteService from '../services/notes'

const LoginForm = ({ setUserState, setErrorMessage }) => {    
    const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')


    const handleLogin = async (event) => {
        event.preventDefault()
    
        try {
            const user = await loginService.login({
                username,
                password
            })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            
            noteService.setToken(user.token)
            setUserState(user)

            setUsername('')
            setPassword('')
        } catch(exception) { 
            setErrorMessage('Wrong credential')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    }

    
    return (
        <form onSubmit={ handleLogin }>
            <div>
                Username:
                <input
                    type='text'
                    value={username}
                    name='username'
                    onChange={ ({ target }) => setUsername( target.value )}
                />
            </div>

            <div>
                Password:
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={ ({ target }) => setPassword( target.value )}
                />
            </div>

            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm