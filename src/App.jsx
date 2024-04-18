import './App.css'
import { useState, useEffect } from 'react'
import EditTimeModal from './components/EditTimeModal'

function App() {
  const defaultTimer = {
    playing: false,
    time: 130000,
    totalTime: 130000,
  }

  const timeToMS = (measurement, time) => {
    if (measurement === 'hours') {
      return time * 1000 * 60 * 60
    } else if (measurement === 'minutes') {
      return time * 1000 * 60
    } else {
      return time * 1000
    }
  }

  function msToTime(duration, object = false) {

    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (object) {
      return { hours, minutes, seconds }
    }

    return hours + ":" + minutes + ":" + seconds;
  }


  //Increments
  const defaultIncrements = [{ time: 2, measurement: 'minutes', add: true }, { time: 1, measurement: 'minutes', add: true }, { time: 30, measurement: 'secs', add: true }, { time: 15, measurement: 'secs', add: true }, { time: 10, measurement: 'secs', add: true }, { time: 5, measurement: 'secs', add: true }, { time: 2, measurement: 'secs', add: true }, { time: 1, measurement: 'secs', add: true }]

  const [increments, setIncrements] = useState(defaultIncrements)

  // Timer
  const [playing, setPlaying] = useState(defaultTimer.playing)
  const [time, setTime] = useState(defaultTimer.time)
  const [timePassed, setTimePassed] = useState(0)
  const [totalTime, setTotalTime] = useState(defaultTimer.totalTime)

  const changeTime = (amount, add) => {
    setTime(eval(`${time}${add ? '+' : '-'}${amount}`))
  }

  const setNewTime = (newTime) => {
    setTime(newTime)
  }

  const startStopTimer = () => {

    if (!playing) {
      setPlaying(true)
      setTimePassed(1)
    } else {
      setPlaying(false)
    }
    setPlaying(!playing)

  }

  useEffect(() => {
    if (!playing) return

    const interval = setInterval(() => {
      setTimePassed(timePassed + 1000);
    }, 1000);

    return () => clearInterval(interval);

  }, [timePassed])

  //modal

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-800 flex justify-center">

      <div className="flex max-w-screen-lg w-full h-full p-8 md:items-center">
        <section className="w-full border border-white border-4 rounded-2xl flex flex-col text-white p-8 h-fit items-center gap-10">

          <div className='flex items-baseline gap-3'><h1 className="text-8xl font-semibold">{msToTime(time - timePassed)}</h1><p className='text-blue-500 underline cursor-pointer font-semibold' onClick={() => setModalOpen(true)}>Edit</p> </div>
          <p onClick={() => startStopTimer()} className='text-blue-500 underline cursor-pointer font-semibold'>Play</p>
          <p>totalTime {msToTime(time)}</p>


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
                  <div key={`${index}_increment`} onClick={() => changeTime(timeToMS(increment.measurement, increment.time), increment.add)} className="flex items-center justify-center rounded-full border border-white h-[70px] w-[70px] text-xl font-medium select-none hover:bg-white hover:border-gray-800 hover:text-gray-800 cursor-pointer transition">{increment.add ? '+' : '-'}{increment.time}{increment.measurement.charAt(0)}</div>
                )
              })}
            </div>

          </div>
        </section>

      </div>

      <EditTimeModal setNewTime={(amount, add) => changeTime(amount, add)} currentTime={msToTime(time, true)} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}

export default App
