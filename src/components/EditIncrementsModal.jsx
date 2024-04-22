import { useEffect, useState } from "react"
import Button from "./utils/Button"
import Modal from "./utils/Modal"


const incrementsForm = (props) => {
    const [updatedIncrements, setUpdatedIncrements] = useState(props.increments)

    const addOptions = [
        { value: true, name: '+' },
        { value: false, name: '-' }
    ]

    const measurementOptions = [
        { value: 'seconds', name: 'Seconds' },
        { value: 'minutes', name: 'Minutes' },
        { value: 'hours', name: 'Hours' },
    ]

    const operatorOptions = [
        { value: '>', name: 'Greater than' },
        { value: '<', name: 'Less than' },
    ]

    const comparisonOptions = [
        { value: '&&', name: 'and' },
        { value: '||', name: 'or' },
        { value: '', name: '' }
    ]

    //increment
    const addIncrements = () => {
        const updatedIncrement = updatedIncrements
        updatedIncrement.push({ time: 5, measurement: 'secs', add: true })
        setUpdatedIncrements([...updatedIncrement])
    }

    const updateIncrementField = (event, index, conditionIndex) => {
        const { name: key, value: updatedValue } = event.target
        const updatedIncrement = updatedIncrements

        if (conditionIndex >= 0) {
            updatedIncrement[index].conditions[conditionIndex][key] = updatedValue
        } else {
            updatedIncrement[index][key] = updatedValue
        }
        setUpdatedIncrements([...updatedIncrement])
    }

    const deleteIncrement = (index) => {
        const updatedIncrement = updatedIncrements
        updatedIncrement.splice(index, 1)
        setUpdatedIncrements([...updatedIncrement])
    }


    const saveIncrements = () => {
        props.updateIncrements(updatedIncrements)
        props.onClose()
    }

    // increment conditions 
    const addCondition = (incrementIndex) => {
        const defaultAddCondition = { time: 5, measurement: 'seconds', operator: '>', comparison: '&&' }
        const updatedIncrement = updatedIncrements
        updatedIncrement[incrementIndex].conditions.push(defaultAddCondition)
        setUpdatedIncrements([...updatedIncrement])

    }

    const deleteCondition = (incrementIndex, conditionIndex) => {
        const updatedIncrement = updatedIncrements
        updatedIncrement[incrementIndex].conditions.splice(conditionIndex, 1)
        setUpdatedIncrements([...updatedIncrement])
    }

    const incrementConditions = (increment, incrementIndex) => {

        let conditionsContent = ''
        let addButton = ''

        if (increment.conditions?.length) {
            conditionsContent = increment.conditions.map((condition, conditionIndex) => {
                return (
                    <div className="flex gap-5 justify-between">
                        <div className="flex gap-5 items-baseline">
                            <select className="border-gray-800 border rounded-sm p-1 w-25" value={condition.operator} name="operator" onChange={(e) => updateIncrementField(e, incrementIndex, conditionIndex)}>
                                {operatorOptions.map((option) => <option key={option.name} value={option.value}>{option.name}</option>)}
                            </select>
                            <input className="border-gray-800 border rounded-sm p-1 w-16" type="number" value={condition.time} name="time" onChange={(e) => updateIncrementField(e, incrementIndex, conditionIndex)} />
                            <select className="border-gray-800 border rounded-sm p-1 w-25" value={condition.measurement} name="measurement" onChange={(e) => updateIncrementField(e, incrementIndex, conditionIndex)}>
                                {measurementOptions.map((option) => <option key={option.name} value={option.value}>{option.name}</option>)}
                            </select>

                            {conditionIndex === 0 ? <select className="border-gray-800 border rounded-sm p-1 w-25" value={condition.comparison} name="comparison" onChange={(e) => updateIncrementField(e, incrementIndex, conditionIndex)}>
                                {comparisonOptions.map((option) => <option key={option.name} value={option.value}>{option.name}</option>)}
                            </select>
                                : ''}
                        </div>

                        <p className='text-blue-500 underline cursor-pointer font-semibold' onClick={() => deleteCondition(incrementIndex, conditionIndex)}>Delete</p>
                    </div>
                )
            })

        }

        if (!increment.conditions.length || increment.conditions.length !== 2) {
            addButton = <p className='text-blue-500 underline cursor-pointer font-semibold' onClick={() => addCondition(incrementIndex)}>Add condition</p>
        }

        return (
            <div className="flex flex-col gap-5">
                {conditionsContent}
                {addButton}
            </div>
        )

    }

    return (
        <div className="flex flex-col gap-5">
            <p className='text-blue-500 underline cursor-pointer font-semibold' onClick={() => addIncrements()}>add Increment</p>

            {updatedIncrements.map((increment, index) => {
                return (
                    <div key={`${increment}_${index}`} className="flex flex-col gap-2">
                        time option
                        <div className="flex gap-5 items-baseline">
                            <select className="border-gray-800 border rounded-sm p-1 w-16" value={increment.add} name="add" onChange={(e) => updateIncrementField(e, index)}>
                                {addOptions.map((option) => <option key={option.name} value={option.value}>{option.name}</option>)}
                            </select>
                            <input className="border-gray-800 border rounded-sm p-1 w-16" type="number" value={increment.time} name="time" onChange={(e) => updateIncrementField(e, index)} />
                            <select className="border-gray-800 border rounded-sm p-1 w-25" value={increment.measurement} name="measurement" onChange={(e) => updateIncrementField(e, index)}>
                                {measurementOptions.map((option) => <option key={option.name} value={option.value}>{option.name}</option>)}
                            </select>
                            <p className='text-blue-500 underline cursor-pointer font-semibold' onClick={() => deleteIncrement(index)}>Delete</p>
                        </div>

                        render condition
                        {incrementConditions(increment, index)}
                    </div>
                )
            })}

            <Button clicked={() => saveIncrements()} text="Save Increments" />
        </div>
    )


}


function EditIncrementsModal(props) {
    const ModalContent = () => {
        return (
            <div className="flex flex-col">
                {incrementsForm(props)}
            </div>
        )
    }

    return (
        <Modal onClose={props.onClose} isOpen={props.isOpen} content={<ModalContent />} />
    )

}

export default EditIncrementsModal
