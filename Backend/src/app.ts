import express  from "express";
import { createConnection }from './config/mysql.js'
import userRouter from "./route/user-route.js";
import cors from "cors"
import taskRouter from "./route/task-route.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))


app.get("/",(req,res)=>{
    try{
    res.send({
        error:false,
        message:"welcome home"
    })
    }
    catch(err:any){
        res.send({
            error:true,
            message:err.message
        })
    }
})


app.use("/api/user",userRouter)

app.use("/api/task",taskRouter)




async function connsql(){
    try{
        await createConnection()
        app.listen(3000,()=>{
            console.log("connection is running...")
        })
    }
    catch(err){
        console.log(err)
    }
}
connsql()