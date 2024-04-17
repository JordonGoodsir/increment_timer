import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const defaultTimer = {
    playing: true,
    time: 130000,
    totalTime: 130000,
  }

  const timeToMS = (measurement, time) => {
    if (measurement === 'hours') {
      return time * 1000 * 60 * 60
    } else if (measurement === 'mins') {
      return time * 1000 * 60
    } else {
      return time * 1000
    }
  }

  function msToTime(duration) {

    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  const defaultIncrements = [{ time: 2, measurement: 'mins', add: true }, { time: 1, measurement: 'mins', add: true }, { time: 30, measurement: 'secs', add: true }, { time: 15, measurement: 'secs', add: true }, { time: 2, measurement: 'secs', add: true }, { time: 1, measurement: 'secs', add: true }]

  const [totalTime, setTotalTime] = useState(defaultTimer.totalTime)
  const [playing, setPlaying] = useState(defaultTimer.playing)
  const [time, setTime] = useState(defaultTimer.time)
  const [timerInterval, setTimerInterval] = useState(null)
  const [increments, setIncrements] = useState(defaultIncrements)

  const changeTime = (amount, add) => {
    // console.error('changing')
    // console.error(time)
    setTime(eval(`${time}${add ? '+' : '-'}${amount}`))
  }

  const setNewTime = (newTime) => {
    setTime(newTime)
  }

  const startStopTimer = () => {
    console.error(playing)
    setPlaying(!playing)

    if (!playing) {
      clearInterval(timerInterval)
      console.error('stopping it')
    } else {
      console.error('start it')
      const interval = setInterval(() => changeTime(1000, false), 1000)
      setTimerInterval(interval)
    }
  }

  useEffect(() => { 
    console.error(time)
  },[time])

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-800 flex justify-center">

      <div className="flex max-w-screen-lg w-full h-full p-8 md:items-center">
        <section className="w-full border border-white border-4 rounded-2xl flex flex-col text-white p-8 h-fit items-center gap-10">

          <div className='flex items-baseline gap-3'><h1 className="text-8xl font-semibold">{msToTime(time)}</h1><p className='text-blue-500 underline cursor-pointer font-semibold'>Edit</p> </div>
          <p onClick={() => startStopTimer()} className='text-blue-500 underline cursor-pointer font-semibold'>Play</p>


          <div className='flex flex-col w-full gap-5'>
            <div className="flex flex-col w-fit">
              <h2 className="text-2xl font-semibold">
                Increments
              </h2>
              <div className='h-px w-[100%] bg-white translate-x-[35%]' />
            </div>
            <div className="flex gap-5">
              {increments.map((increment, index) => {
                return (
                  <div key={`${index}_increment`} onClick={() => changeTime(time + timeToMS(increment.measurement, increment.time))} className="flex items-center justify-center rounded-full border border-white h-[70px] w-[70px] text-xl font-medium select-none hover:bg-white hover:border-gray-800 hover:text-gray-800 cursor-pointer transition">{increment.add ? '+' : '-'}{increment.time}{increment.measurement.charAt(0)}</div>
                )
              })}
            </div>

          </div>
        </section>

      </div>

    </main>
  )
}

export default App
