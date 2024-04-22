import { createSlice } from '@reduxjs/toolkit'

export const timer = createSlice({
    name: 'timer',
    initialState: {
        time: 0,
    },
    reducers: {
        setNewTime: (state, newTime) => {
            state.time = newTime.payload
        },
        changeTime: (state, options) => {
            state.time = eval(`${state.time}${options.payload.add ? '+' : '-'}${options.payload.amount}`)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setNewTime, changeTime } = timer.actions

export default timer.reducer