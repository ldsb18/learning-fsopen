import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "message":
			return action
		case "error":
			return action
		case "empty":
			return action
		default:
			return state
	}
}

const notificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, { payload: null, type: 'empty' })

	return (
		<notificationContext.Provider value={[notification, notificationDispatch] }>
			{props.children}
		</notificationContext.Provider>
	)
}

export const useNotificationValue= () => {
	const notificationAndDispatch = useContext(notificationContext)
	return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(notificationContext)
	return notificationAndDispatch[1]
}

export default notificationContext