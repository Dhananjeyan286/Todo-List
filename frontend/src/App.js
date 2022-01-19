import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from './components/Header'
import Addtask from './components/Addtask'
import Tasks from './components/Tasks'
import Edit_task from './components/Edit_task'
import Footer from './components/Footer'
import axios from "axios"
import catch_errors from './catch_errors'
import {Message} from "semantic-ui-react"

// import Success_message from './components/Success_message'
// import Error_message from './components/Error_message'

const App = () => {

	const [showadd,set_showadd]=useState(false)
	const [tasks,set_tasks]=useState([])
	const [success_msg,set_success_msg]=useState("")
	const [error_msg,set_error_msg]=useState("")

	// {
	// 	"id":"1",
	// 	"text": "Doctor's appointment",
	// 	"day": "2021-01-19T00:00:00.000Z",
	// 	"reminder": true
	// },
	// {
	// 	"id":"2",
	// 	"text": "Teacher's appointment",
	// 	"day": "2021-01-19T00:00:00.000Z",
	// 	"reminder": false
	// },
	// {
	// 	"id":"3",
	// 	"text": "Professor's appointment",
	// 	"day": "2023-01-24T00:00:00.000Z",
	// 	"reminder": true
	// },
	// {
	// 	"id":"4",
	// 	"text": "Office Work",
	// 	"day": "2023-01-24T00:00:00.000Z",
	// 	"reminder": true,		
	// }


	useEffect(()=>{

		const fetch_data=async()=>{
			const {data}=await axios.get("/api/task")
			set_tasks(data)
		}

		fetch_data()

	},[tasks])

	const delete_task=async(id)=>{
		try{
			const {data}=await axios.delete(`/api/task/${id}`)
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

	const add_task=async(task)=>{
		const {text,reminder,day}=task
		//console.log(text+" "+reminder+" "+day)

		try{
			const config={
				headers:{
					"Content-Type":"application/json"
				}
			}

			const {data}=await axios.post("/api/task",{text,reminder,day},config)

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

	

	return (
		<Router>
			<div className='container'>
				<Header title="Todo List" showadd={showadd} set_showadd={set_showadd}/>

				<Route path="/" exact render={()=>(
					<>
						{/* {success_msg && <Success_message content={success_msg} set_success_msg={set_success_msg} />}
						{error_msg && <Error_message content={error_msg} set_error_msg={set_error_msg} />} */}
						{success_msg && <Message success content={success_msg} onDismiss={()=>set_success_msg(null)} />}
            			{error_msg && <Message error content={error_msg} onDismiss={()=>set_error_msg(null)} />}
						{showadd && <Addtask add_task={add_task}/>}
						{tasks.length>0?(<Tasks tasks={tasks} onclick={delete_task}/>):(<h3>No Messages to show </h3>)}
					</>
				)} />
				<Route path="/task/:id" component={Edit_task} />
				{/* <Route path="/task/:id" render={()=>(
					<>	
						{/* {success_msg && <Success_message content={success_msg} set_success_msg={set_success_msg} />}
						{error_msg && <Error_message content={error_msg} set_error_msg={set_error_msg} />} 
						<Edit_task update_task={update_task} />
					</>
				)} /> */}

				<Footer />	
			</div>
		</Router>
	)
}

export default App
