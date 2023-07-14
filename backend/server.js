/* To start type npm start */


const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config({path:"./backend/config/config.env"})
const connect_db=require("./config/db") 
const task_routes=require("./routes/task_routes")
const path=require("path")

connect_db()

app.use(express.json())



app.use("/api/task",task_routes)

const _dirname=path.resolve()
if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(_dirname,"/frontend/build")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,"frontend","build","index.html"))
    })
}
else{
    app.get("/",(req,res)=>
    res.send("hi")
)
}

const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
})
