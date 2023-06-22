import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
	switch(action.type) {
		case 'SET_NOTIF' : 
			return action.payload
		default :
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '')

	return(
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{ props.children }
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const valueAndDispatch = useContext(NotificationContext)
	return valueAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const valueAndDispatch = useContext(NotificationContext)
	return valueAndDispatch[1]
}

export default NotificationContext