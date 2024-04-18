import Modal from "./utils/Modal"



function EditTimeModal(props) {

    const timeToMS = (measurement, time) => {
        if (measurement === 'hours') {
            return time * 1000 * 60 * 60
        } else if (measurement === 'minutes') {
            return time * 1000 * 60
        } else {
            return time * 1000
        }
    }

    const ModalContent = () => {
        const timeMeasurements = [
            { label: 'Hrs', max: 24, name: 'hours' },
            { label: 'Mins', max: 59, name: 'minutes' },
            { label: 'Secs', max: 59, name: 'seconds' }
        ]
        const handleInput = (event, measurement) => {
            const newVal = event.target.value
            const oldVal = Number(props.currentTime[measurement])

            props.setNewTime(timeToMS(measurement, Math.abs(newVal - oldVal)), (newVal > oldVal))
        }

        return (
            <div className="flex flex-col">
                <div className="flex gap-5">
                    {timeMeasurements.map((measurement) => {
                        return (
                            <div className="flex flex-col">
                                <input className="border-gray-800 border rounded-sm p-1 w-16" type="number" max={measurement.max} min={0} value={props.currentTime[measurement.name]} onChange={(e) => handleInput(e, measurement.name)} />
                                <p>{measurement.label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <Modal onClose={props.onClose} isOpen={props.isOpen} content={<ModalContent />} />
    )

}

export default EditTimeModal