import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = asyncHandler(async(req,res)=>{
    try {
        const {message} = req.body;
        const receiverUsername = req.params.username
        const senderId = req.user?._id
        const receiver = await User.findOne({username: receiverUsername}).select("-password -refreshToken")

        if(!receiver){
            throw new ApiError(400,"Requested User Not Found!!")
        }
    
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiver._id] },
        });
        if(!conversation){
            throw new ApiError(400,"Conversation Does not exists");
        }
    
        const newMessage = await Message.create({
            senderId,
            receiverId: receiver._id,
            message
        })
        conversation.messages.push(newMessage._id)
    
        await Promise.all([conversation.save(),newMessage.save()]);
    
        //socket
        const receiverSocketId = getReceiverSocketId(receiver._id)
        if(receiverSocketId){
            //io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        return res.status(200)
        .json(new ApiResponse(200,newMessage,"Message sent Successfully!!!"))
    } catch (error) {
        throw new ApiError(500,`${error.message} || "Error occured while sending message`)
    }
})



export {sendMessage};



