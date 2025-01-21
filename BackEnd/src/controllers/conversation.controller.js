import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";


const searchUser = asyncHandler(async (req,res)=>{
    const username = req.params.username
    const newUser = await User.findOne({username: username}).select("-password -refreshToken")
    console.log(username);
    if(!newUser){
        return res.status(200)
        .json(new ApiResponse(200,{},"User Not Found!!!"))
    }

    return res.status(200)
        .json(new ApiResponse(200,newUser,"Requested User Found!!"))
})

const addUser = asyncHandler(async (req,res)=>{
    const username = req.params.username
    console.log(username);
    const newUser = await User.findOne({username:username}).select("-password -refreshToken")
    
    if(!newUser){
        throw new ApiError(400,"Requested User Not Found!!")
    }
    const conversation = await Conversation.findOne({
        participants: {$all: [req.user?._id,newUser._id]}
    })
    if(conversation){
        throw new ApiError(400,"Conversation already exists!!!")
    }
    const newConversation = await Conversation.create({
        participants: [req.user?._id,newUser._id],
        messages: []
    })

    //socket

    return res.status(200)
        .json(new ApiResponse(200,{newConversation},"New Conversation Created!!"))
})

const getConversation = asyncHandler(async(req,res)=>{
    
    const senderId = req.user?._id;
    const receiverUsername = req.params.username
    const receiver = await User.findOne({username: receiverUsername}).select("-password -refreshToken")

    if(!receiver){
        throw new ApiError(400,"Requested User Not Found!!")
    }

    const conversation = await Conversation.findOne({participants: {$all: [senderId, receiver._id]}});
    
    if(!conversation){
        throw new ApiError(401,"Converation Does not exists\nCannot get Conversation!!")
    }

    const messages = await Message.find({ '_id': { $in: conversation.messages } }).sort({ timestamp: 1 });

    return res.status(200)
    .json(new ApiResponse(200,messages,"Messages Fetched Successfully!!"))
})

const getAllConversation = asyncHandler(async (req,res)=>{
    const senderId = req.user?._id;

    const conversation = await Conversation.aggregate([
        {
            $match: {participants: {$in: [senderId]}}
        },
        {
            $lookup:{
                from: "users",
                localField: 'participants',
                foreignField: "_id",
                as: "userDetails",
                pipeline: [
                    {
                        $match:{_id: {$ne:senderId}}
                    },
                    {
                        $project:{
                            _id:1,
                            username:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                _id:1,
                updatedAt:1,
                userDetails: 1
            }
        }
    ])

    return res.status(200)
    .json(new ApiResponse(200,conversation,"All conversation Fetched Successfully!!"))
})

export {addUser,getConversation,getAllConversation,searchUser}

