import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ setToken, show, setPage }) => {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
		onError: (error) => {
			console.log(error.graphQLErrors[0].message)
		},
	})

    useEffect( () => {
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('loggedUser', token)
            setPage('books')
        }
    }, [result.data, setToken])

    const submit = (evt) => {
        evt.preventDefault()

        login({ variables: {username, password}} )
    }

    if(!show) {
        return null
    }

    return(
        <div>
            <form onSubmit={submit}>
                <div>
                    Username: <input 
                        value={username}
                        onChange={ ({ target }) => setUsername(target.value) }
                    />
                </div>

                <div>
                    Password: <input 
                        value={password}
                        onChange={ ({ target }) => setPassword(target.value) }
                        type="password"
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm
