import { useEffect, useState } from "react"
import Modal from "./utils/Modal"
import { useSelector } from 'react-redux'

const timeInputs = (setNewTime) => {
    const timerStore = useSelector((state) => state.timerStore)

    // useEffect(() => {
    //     console.error('triggered')
    //     // setCurrentTime(msToTime(Number(JSON.stringify(JSON.parse(timerStore.time)))))

    //     setCurrentTime(msToTime(JSON.stringify(JSON.parse(timerStore.time)), true))
    // }, [])
    
    
    const test = msToTime(JSON.stringify(JSON.parse(timerStore.time)), true)
    const [currentTime, setCurrentTime] = useState(test)

    const timeMeasurements = [
        { label: 'Hrs', max: 24, name: 'hours' },
        { label: 'Mins', max: 59, name: 'minutes' },
        { label: 'Secs', max: 59, name: 'seconds' }
    ]

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
    
        if (object) {
          return { hours, minutes, seconds }
        }
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return hours + ":" + minutes + ":" + seconds;
      }

    const handleInput = (event, measurement) => {
        const timeMeasurements = [
            { label: 'Hrs', max: 24, name: 'hours' },
            { label: 'Mins', max: 59, name: 'minutes' },
            { label: 'Secs', max: 59, name: 'seconds' }
        ]

        let newVal = event.target.value
        const currentMeasurement = timeMeasurements.findIndex((val) => val.name === measurement)
        if (newVal > timeMeasurements[currentMeasurement].max) newVal = timeMeasurements[currentMeasurement].max
        else if (newVal < 0) newVal = 0

        // add to local state
        const newTimes = { ...currentTime, [measurement]: newVal }
        setCurrentTime(newTimes)

        // add to global state
        const totalTime = timeMeasurements.reduce((newTime, currentMeasurement) => {
            newTime += timeToMS(currentMeasurement.name, newTimes[currentMeasurement.name])

            return newTime
        }, 0)

        setNewTime(totalTime)
    }

    return (
        <div className="flex gap-5">
            {timeMeasurements.map((measurement, index) => {
                return (
                    <div key={`${measurement}_${index}`} className="flex flex-col">
                        <input className="border-gray-800 border rounded-sm p-1 w-16" type="number" max={measurement.max} min={0} value={currentTime[measurement.name]} onChange={(e) => handleInput(e, measurement.name)} />
                        <p>{measurement.label}</p>
                    </div>
                )
            })}
        </div>
    )

}

function EditTimeModal(props) {
    const ModalContent = () => {
        return (
            <div className="flex flex-col">
                {timeInputs(props.setNewTime)}
            </div>
        )
    }

    return (
        <Modal onClose={props.onClose} isOpen={props.isOpen} content={<ModalContent />} />
    )
}

export default EditTimeModal
