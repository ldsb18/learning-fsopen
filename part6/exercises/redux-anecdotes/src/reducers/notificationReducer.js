import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        eraseNotification(state, action) {
            return ''
        }
    }
})

export const { setNotification, eraseNotification } = notificationSlice.actions
export default notificationSlice.reducer