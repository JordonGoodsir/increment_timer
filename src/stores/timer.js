import { createSlice } from '@reduxjs/toolkit'

export const timer = createSlice({
    name: 'timer',
    initialState: {
        time: 0,
    },
    reducers: {
        setNewTime: (state, newTime) => {
            state.time = newTime
        },
        changeTime: (amount, add) => {
            state.time = eval(`${state.time}${add ? '+' : '-'}${amount}`)
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = score.actions

export default timer.reducer