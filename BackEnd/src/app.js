import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
import {app} from './socket/socket.js'

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers you need
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // List of HTTP methods allowed
  }));


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"));
app.use(cookieParser());


import userRoute from "./routes/user.routes.js"
import conversationRoute from "./routes/conversation.routes.js"
import messageRoute from "./routes/message.routes.js"



app.use("/api/user",userRoute)
app.use("/api/conversation",conversationRoute)
app.use("/api/message",messageRoute)

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
  });
});

export {app}