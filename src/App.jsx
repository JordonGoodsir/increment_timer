import './App.css'
import { useState, useEffect } from 'react'
import EditTimeModal from './components/EditTimeModal'
import EditIncrementsModal from './components/EditIncrementsModal'
import { useDispatch, useSelector } from 'react-redux'
import { setNewTime, changeTime } from './stores/timer'

const visualTimer = (openModal) => {
  const time = useSelector((state) => state.timerStore).time

  function msToTime(duration, object = false) {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    if (object) {
      return { hours, minutes, seconds }
    }

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  const [playing, setPlaying] = useState(false)
  const [timePassed, setTimePassed] = useState(0)

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
    if (!playing || (time - timePassed) === 0) return

    const interval = setInterval(() => {
      setTimePassed(timePassed + 1000);
    }, 1000);

    return () => clearInterval(interval);

  }, [timePassed])

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-baseline gap-3'><h1 className="text-8xl font-semibold">{msToTime(time - timePassed)}</h1><p className='text-blue-500 underline cursor-pointer font-semibold' onClick={() => openModal(true)}>Edit</p> </div>
      <p onClick={() => startStopTimer()} className='text-blue-500 underline cursor-pointer font-semibold'>Play</p>
      <p>totalTime {msToTime(time)}</p>
    </div>
  )
}

const shownIncrements = () => {
  const time = useSelector((state) => state.timerStore).time
  const dispatch = useDispatch()

  const timeToMS = (measurement, time) => {
    if (measurement === 'hours') {
      return time * 1000 * 60 * 60
    } else if (measurement === 'minutes') {
      return time * 1000 * 60
    } else {
      return time * 1000
    }
  }

  const defaultIncrements = [
    // under 10 mins
    {
      time: 10, measurement: 'seconds', add: true, conditions:
        [
          { time: 10, measurement: 'minutes', operator: '<', comparison: '&&' },
        ]
    },
    {
      time: 1, measurement: 'second', add: true, conditions:
        [
          { time: 10, measurement: 'minutes', operator: '<', comparison: '&&' },
        ]
    },
    {
      time: 2, measurement: 'minutes', add: true, conditions:
        [
          { time: 10, measurement: 'minutes', operator: '<', comparison: '&&' },
        ]
    },
    {
      time: 1, measurement: 'minutes', add: true, conditions:
        [
          { time: 10, measurement: 'minutes', operator: '<', comparison: '&&' },
        ]
    },

    // over 10 mins less than 15 mins
    {
      time: 5, measurement: 'seconds', add: true, conditions:
        [
          { time: 10, measurement: 'minutes', operator: '>', comparison: '&&' },
          { time: 15, measurement: 'minutes', operator: '<', comparison: '' },
        ]
    },
    {
      time: 1, measurement: 'second', add: true, conditions:
        [
          { time: 10, measurement: 'minutes', operator: '>', comparison: '&&' },
          { time: 15, measurement: 'minutes', operator: '<', comparison: '' }
        ]
    },
    {
      time: 30, measurement: 'seconds', add: true, conditions:
        [
          { time: 10, measurement: 'minutes', operator: '>', comparison: '&&' },
          { time: 15, measurement: 'minutes', operator: '<', comparison: '' },
        ]
    },
    {
      time: 15, measurement: 'second', add: true, conditions:
        [
          { time: 10, measurement: 'minutes', operator: '>', comparison: '&&' },
          { time: 15, measurement: 'minutes', operator: '<', comparison: '' }
        ]
    },

    // over 15 mins
    {
      time: 2, measurement: 'seconds', add: true, conditions:
        [
          { time: 15, measurement: 'minutes', operator: '>', comparison: '' },
        ]
    },
    {
      time: 1, measurement: 'second', add: true, conditions:
        [
          { time: 15, measurement: 'minutes', operator: '>', comparison: '' },
        ]
    },
    {
      time: 15, measurement: 'seconds', add: true, conditions:
        [
          { time: 15, measurement: 'minutes', operator: '>', comparison: '' },
        ]
    },
    {
      time: 5, measurement: 'second', add: true, conditions:
        [
          { time: 15, measurement: 'minutes', operator: '>', comparison: '' },
        ]
    },

  ]

  const [increments, setIncrements] = useState(defaultIncrements)
  const [incrementsModalOpen, setIncrementsModalOpen] = useState(false)
  return (
    <div className='flex flex-col w-full gap-5'>
      <div className="flex flex-col w-fit">
        <h2 className="text-2xl font-semibold">
          Increments
        </h2>
        <div className='h-px w-[100%] bg-white translate-x-[35%]' />
        <p className='text-blue-500 underline cursor-pointer font-semibold' onClick={() => setIncrementsModalOpen(true)}>Edit</p>
      </div>
      <div className="flex gap-5">
        {
          increments.map((increment, index) => {
            if (increment.conditions?.length) {

              const equation = increment.conditions.reduce((eq, condition) => {

                eq += time
                // time
                eq += condition.operator
                // time >
                eq += timeToMS(condition.measurement, condition.time)
                // time > specifiedTime
                if (condition.comparison && increment.conditions.length > 1) eq += condition.comparison
                // time > specifiedTime &&

                return eq
              }, '')

              if (eval(equation)) {
                return (
                  <div key={`${index}_increment`} onClick={() => dispatch(changeTime({ amount: timeToMS(increment.measurement, increment.time), add: increment.add }))} className="flex items-center justify-center rounded-full border border-white h-[70px] w-[70px] text-xl font-medium select-none hover:bg-white hover:border-gray-800 hover:text-gray-800 cursor-pointer transition">
                    {increment.add ? '+' : '-'}{increment.time}{increment.measurement.charAt(0)}
                  </div>
                )
              }
            } else {
              return <div key={`${index}_increment`} onClick={() => dispatch(changeTime({ amount: timeToMS(increment.measurement, increment.time), add: increment.add }))} className="flex items-center justify-center rounded-full border border-white h-[70px] w-[70px] text-xl font-medium select-none hover:bg-white hover:border-gray-800 hover:text-gray-800 cursor-pointer transition">
                {increment.add ? '+' : '-'}{increment.time}{increment.measurement.charAt(0)}
              </div>
            }
          })
        }
      </div>

      <EditIncrementsModal isOpen={incrementsModalOpen} updateIncrements={(newIncrements) => setIncrements(newIncrements)} increments={increments} onClose={() => setIncrementsModalOpen(false)} />
    </div>
  )

}

function App() {
  const dispatch = useDispatch()

  const setStoreTime = (newTime) => {
    dispatch(setNewTime(newTime))
  }

  //modal
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-800 flex justify-center">

      <div className="flex max-w-screen-lg w-full h-full p-8 md:items-center">
        <section className="w-full border border-white border-4 rounded-2xl flex flex-col text-white p-8 h-fit items-center gap-10">
          {visualTimer(() => setModalOpen(true))}

          {shownIncrements()}
        </section>
      </div>

      <EditTimeModal setNewTime={(newTime) => setStoreTime(newTime)} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}

export default App
