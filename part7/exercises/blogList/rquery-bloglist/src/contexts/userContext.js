import { createContext, useContext, useReducer } from "react"

const userReducer = (state, action) => {
	switch (action.type) {
		case "login":
			return action.payload
		case "logout":
			return action.payload
		case "initialize": {
			const loggedUser = window.localStorage.getItem("loggedUser")
			if(loggedUser) {
				return JSON.parse(loggedUser)
			} else {
				return action.payload
			}
		}
		default:
			return state
	}
}

const userContext = createContext()

export const UserContextProvider = props => {
	const [user, userDispatch] = useReducer(
		userReducer,
		null,
	)

	return (
		<userContext.Provider
			value={[user, userDispatch]}>
			{props.children}
		</userContext.Provider>
	)
}

export const useUserValue = () => {
	const valueAndDispatch = useContext(userContext)
	return valueAndDispatch[0]
}

export const useUserDispatch = () => {
	const valueAndDispatch = useContext(userContext)
	return valueAndDispatch[1]
}

export default userContext
