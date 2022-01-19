const mongoose=require("mongoose")

const task_model=mongoose.Schema({
    text:{
        type:String,
        required:true,
        unique:true
    },
    reminder:{
        type:Boolean,
        default:false
    },
    day:{
        type:Date,
        required:true
    }
},
{
    timestamps:true
})

const task=mongoose.model("task",task_model)

module.exports=task