import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
	},
})

export const { setUsers } = usersSlice.actions

export const storeUsers = (users_data) => {
	return async dispatch => {
		dispatch(setUsers(users_data))
	}
}

export default usersSlice.reducer
