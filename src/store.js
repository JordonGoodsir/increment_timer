import { configureStore } from '@reduxjs/toolkit'
import Timer from "./stores/timer"

export default configureStore({
    reducer: {
        timerStore: Timer
    },
})