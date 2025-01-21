//require('dotenv').config({path:'./.env'})
import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/index.js"
import { server } from "./socket/socket.js"

dotenv.config({
    path: './.env'
})

connectDB()
    .then(()=>{
        server.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running at port: ${process.env.PORT || 8000}`)
        })
    })
    .catch((error)=>{
        console.log("MongoDB connection failed!!!\n",error)
    })


export default app;    