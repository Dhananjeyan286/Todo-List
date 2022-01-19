import axios from 'axios'
import React,{useState,useEffect} from 'react'
import catch_errors from '../catch_errors'
import {useLocation} from "react-router-dom"
import {Message} from "semantic-ui-react"

const Edit_task = () => {

    const location=useLocation()

    const [text,set_text]=useState("")
    const [day,set_day]=useState("")
    const [reminder,set_reminder]=useState(false)
    const [error_msg,set_error_msg]=useState("")
    const [success_msg,set_success_msg]=useState("")

    const update_task=async(task)=>{
		try{
			const {text,day,reminder,id}=task
			//console.log(text+" "+day+" "+reminder+" "+id)
			const config={
				headers:{
					"Content-Type":"application/json"
				}
			}
			const {data}=await axios.put(`/api/task/${id}`,{text,day,reminder},config)

			//console.log(data)

            set_success_msg(data)
		}
		catch(error)
		{
			let error_msg=catch_errors(error)
			set_error_msg(error_msg)
			//console.log("error "+error_msg)
		}
	}

    const submit_handler=(e)=>{
        e.preventDefault()

        //console.log("match "+match.params.id)

        const id=location.pathname.substring(6)
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

        update_task({id,text,day,reminder})
        //console.log(text+" "+day+" "+reminder)

        set_day(day)
        set_reminder(reminder)
        set_text(text)

    }

    useEffect(()=>{
        const fetch_data=async()=>{
            try{
                //console.log(location.pathname.substring(6))
                //console.log(match)
                const {data}=await axios.get(`/api/task/${location.pathname.substring(6)}`)
                //console.log(data)
                set_day(data.day.substring(0,10))
                set_text(data.text)
                set_reminder(data.reminder)
            }
            catch(error)
            {
                let error_msg=catch_errors(error)
                set_error_msg(error_msg)
                //console.log("error "+error_msg)
            }
        }

        fetch_data()
    },[location,success_msg,error_msg])

    return (
        <div>
            <a href="/"><button className='btn'>Go Back</button></a>
            {success_msg && <Message success content={success_msg} onDismiss={()=>set_success_msg(null)} />}
            {error_msg && <Message error content={error_msg} onDismiss={()=>set_error_msg(null)} />}
            <form className='add-form' onSubmit={submit_handler}>
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
                <input type="submit" value="Update Task" className='btn btn-block' />
            </form>
        </div>
    )
}

export default Edit_task
