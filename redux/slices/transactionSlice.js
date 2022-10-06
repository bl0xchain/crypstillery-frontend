import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        status: 0,
        message: '',
        address: '',
        show: false,
        notifications: []
    },
    reducers: {
        showTxModal(state, action) {
            state.status = action.payload.status
            state.message = action.payload.message
            state.address = action.payload.address
            state.show = true
        },
        hideTxModal(state) {
            state.show = false
        },
        addNotification(state, action) {
            state.notifications.push({
                status: action.payload.status,
                message: action.payload.message
            })
        },
        removeNotification(state) {
            state.notifications.shift()
        }
    }
})

export const { showTxModal, hideTxModal } = transactionSlice.actions

export default transactionSlice.reducer;