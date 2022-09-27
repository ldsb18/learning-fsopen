import noteService from '../services/notes'

const Logout = ({ setUserState }) => {

    const logout = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUserState(null)
        noteService.setToken(null)
    }

    return(
        <button onClick={logout}>
            Logout
        </button>
    )
}

export default Logout