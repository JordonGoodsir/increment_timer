import { createSlice } from '@reduxjs/toolkit'

export const timer = createSlice({
    name: 'timer',
    initialState: {
        time: 0,
        timePassed: 0
    },
    reducers: {
        setNewTime: (state, newTime) => {
            state.time = newTime.payload
        },
        changeTime: (state, options) => {
            state.time = eval(`${state.time}${options.payload.add ? '+' : '-'}${options.payload.amount}`)
        },
        setTimePassed: (state, newTime) => { 
            state.timePassed = newTime.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setNewTime, changeTime, setTimePassed } = timer.actions

export default timer.reducer