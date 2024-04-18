import Modal from "./utils/Modal"



function EditTimeModal(props) {


    const ModalContent = () => {
        const timeMeasurements = [
            { label: 'Hrs', max: 24, name: 'hours' },
            { label: 'Mins', max: 59, name: 'minutes' },
            { label: 'Secs', max: 59, name: 'seconds' }
        ]

        return (
            <div className="flex flex-col">
                <div className="flex gap-5">
                    {timeMeasurements.map((measurement, index) => {
                        return (
                            <div className="flex flex-col">
                                <input className="border-gray-800 border rounded-sm p-1 w-16" type="number" max={measurement.max} min={0} value={props.currentTime[[measurement.name]]} />
                                <p>{measurement.label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <Modal {...props} content={<ModalContent />} />
    )

}

export default EditTimeModal