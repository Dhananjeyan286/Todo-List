const mongoose=require("mongoose")

const connect_db=async()=>{
    try{
        // const con=await mongoose.connect(process.env.MONGO_URI,{
        //     useNewUrlParser:true,
        //     useUnifiedTopology:true,
        //     useFindAndModify:false,
        //     useCreateIndex:true
        // })
        const con=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected ${con.connection.host}`)
    }
    catch(error)
    {
        console.log(error)
        process.exit(1)
    }
}

module.exports=connect_db