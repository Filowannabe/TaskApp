import React from 'react'

export const TaskBanner = (props) => {
    return (<h4 className="bg-success text-white text-center p-4">
        {props.username}'s task app ({props.taskItems.filter(it => !it.done).length} task to do)
    </h4>)
}

