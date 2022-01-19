const express=require("express")
const router=express.Router()
const task_model=require("../models/task_model")

//route-/api/task

router.get("/",async(req,res)=>{
    try{
        const tasks=await task_model.find()
        res.status(200).json(tasks)
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal server error")
    }

})

router.get("/:id",async(req,res)=>{
    try{
        const task=await task_model.findById(req.params.id)
        if(task)
            res.status(200).json(task)
        else
            res.status(404).send("Task not found")    
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.post("/",async(req,res)=>{
    const {text,reminder,day}=req.body

    try{
        const new_task=await task_model.findOne({text:text})
        if(new_task)
        {
            res.status(401).send("Task already exists!")
        }
        else{
            const create_task=await task_model.create({text:text,reminder:reminder,day:day})
            res.status(200).send("Task created successfully!")
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const task=await task_model.findById(id)
        if(task)
        {
            await task_model.findByIdAndRemove(id)
            res.status(200).send("Task deleted successfully!")
        }
        else{
            res.status(401).send("Could not find the task")
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const {text,day,reminder}=req.body

        const find_task=await task_model.findById(req.params.id)
        if(find_task)
        {
            find_task.text=text
            find_task.day=day
            find_task.reminder=reminder
            const updated_task=await find_task.save()
            res.status(200).send("Task updated successfully!")
        }
        else{
            res.status(404).send("Task could not be updated.")
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

module.exports=router