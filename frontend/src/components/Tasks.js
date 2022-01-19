import React from 'react'
import Individual_task from './Individual_task'

const tasks = ({tasks,onclick}) => {
    return (
        <div>
            {tasks.map((task)=>(
                <Individual_task key={task._id} task={task} onclick={onclick} />
            ))}
        </div>
    )
}

export default tasks
