import React,{useState} from 'react'
import {Message} from "semantic-ui-react"

const Addtask = ({add_task}) => {

    const [text,set_text]=useState("")
    const [day,set_day]=useState("")
    const [reminder,set_reminder]=useState(false)
    const [error_msg,set_error_msg]=useState("")
    const [success_msg,set_success_msg]=useState("")

    const submit_handler=(e)=>{
        e.preventDefault()

        if(!text)
        {
            set_error_msg("Enter the task")
            //alert("Enter the task")
            return
        }
        if(!day)
        {
            set_error_msg("Enter the date")
            //alert("Enter the date")
            return
        }

        add_task({text,day,reminder})
        //console.log(text+" "+day+" "+reminder)

        set_day("")
        set_reminder(false)
        set_text("")
    }

    return (
        <form className='add-form' onSubmit={submit_handler}>
            {success_msg && <Message success content={success_msg} onDismiss={()=>set_success_msg(null)} />}
            {error_msg && <Message error content={error_msg} onDismiss={()=>set_error_msg(null)} />}
            <div className='form-control'>
                <label>Task</label>
                <input type="text" placeholder='Enter the task' value={text} onChange={(e)=>{set_text(e.target.value)}} />
            </div>
            <div className='form-control'>
                <label>Enter the date</label>
                <input type="date" value={day} placeholder="Enter the date on which the task should be completed" onChange={(e)=>{set_day(e.target.value)}} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e)=>{set_reminder(e.currentTarget.checked)}} />
            </div>
            <input type="submit" value="Save Task" className='btn btn-block' />
        </form>
    )
}

export default Addtask
