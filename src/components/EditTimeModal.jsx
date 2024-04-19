import { useEffect, useState } from "react"
import Modal from "./utils/Modal"


const timeInputs = (initTime, setNewTime) => {
    const [currentTime, setCurrentTime] = useState(initTime)
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

    useEffect(() => {
        const timeMeasurements = [
            { label: 'Hrs', max: 24, name: 'hours' },
            { label: 'Mins', max: 59, name: 'minutes' },
            { label: 'Secs', max: 59, name: 'seconds' }
        ]

        const newTime = timeMeasurements.reduce((newTime, currentMeasurement) => {
            newTime += timeToMS(currentMeasurement.name, currentTime[currentMeasurement.name])

            return newTime
        }, 0)

        setNewTime(newTime)

    }, [currentTime])

    const handleInput = (event, measurement) => {
        let newVal = event.target.value
        const currentMeasurement = timeMeasurements.findIndex((val) => val.name === measurement)
        if (newVal > timeMeasurements[currentMeasurement].max) newVal = timeMeasurements[currentMeasurement].max
        else if (newVal < 0) newVal = 0
        const newTimes = { ...currentTime, [measurement]: newVal }

        setCurrentTime(newTimes)
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

    const initTime = props.currentTime

    const ModalContent = () => {
        return (
            <div className="flex flex-col">
                {timeInputs(initTime, props.setNewTime)}
            </div>
        )
    }

    return (
        <Modal onClose={props.onClose} isOpen={props.isOpen} content={<ModalContent />} />
    )

}

export default EditTimeModal
