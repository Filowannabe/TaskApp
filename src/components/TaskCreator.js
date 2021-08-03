import React, { useState } from 'react'

export const TaskCreator = (props) => {

    const [newTaskName, setNewTaskName] = useState('')

    const updateTaskValue = e => setNewTaskName(e.target.value)

    const createTask = () => {
        props.callback(newTaskName)
        setNewTaskName('')
    }
    return (
        <div className="my-1">
            <input type="text" className="form-control" value={newTaskName} onChange={updateTaskValue} />

            <button className="btn btn-success mt-1" onClick={createTask}>Add</button>
        </div>
    )
}