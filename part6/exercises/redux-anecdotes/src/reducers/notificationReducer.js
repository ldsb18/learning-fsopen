import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		setInformation(state, action) {
			return action.payload
		}
	}
})

export const { setInformation } = notificationSlice.actions

export const setNotification = ( information, time ) => { 
	return async dispatch => {
		
		dispatch(setInformation( information ))
		
		setTimeout(() => {
			dispatch(setInformation(''))
		}, time * 1000);
	}
}

export default notificationSlice.reducer