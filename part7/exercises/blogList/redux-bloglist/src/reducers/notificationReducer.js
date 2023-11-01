import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		message: "",
		type: "",
	},
	reducers: {
		setInformation(state, action) {
			return action.payload
		},
	},
})

export const { setInformation } = notificationSlice.actions

export const setNotification = (information, time) => {
	return async dispatch => {
		dispatch(setInformation(information))

		setTimeout(() => {
			dispatch(setInformation({message: "", type: ""}))
		}, 1000 * time)
	}
}

export default notificationSlice.reducer
