import React from 'react'
import {FaTimes,FaEdit} from "react-icons/fa"

const Individual_task = ({task,onclick}) => {

    // const delete_task=(id)=>{
    //     console.log(id)
    // }

    return (
        <div className={`task ${task.reminder?'reminder':''}`}>
            <h3>{task.text}
                <div>
                    <h3>
                        <a href={`/task/${task._id}`}><FaEdit style={{cursor:"pointer",color:"black",marginTop:"10px",marginRight:"10px"}} /></a>
                        <FaTimes style={{cursor:"pointer"}} onClick={()=>{onclick(task._id)}} />
                    </h3>
                </div>
            </h3>
            <p>{task.day.substring(0,10)}</p>
        </div>
    )
}

export default Individual_task
