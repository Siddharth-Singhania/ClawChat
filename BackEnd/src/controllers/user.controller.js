import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"


const generateAccessTokenAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken= refreshToken;
        await user.save({validateBeforeSave: false});
        
        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,error || "Something went wrong while generating refresh and access token")
    }
}

const signup = asyncHandler(async (req,res)=>{
    const {fullName,email,username,password,gender} = req.body;

    if([fullName,email,username,password,gender].some((field)=>field?.trim() ==="")){
        throw new ApiError(400,"All Fields are Required!!")
    }
    const existedUser = await User.findOne({
        $or: [{email},{username}]
    })
    if(existedUser){
        throw new ApiError(400,"User with same username or email already exist");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required!!")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar){
        throw new ApiError(500,"Error While Updating Avatar!!!!!")
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        username,
        email,
        gender,
        password
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Something went Wrong while registering the User!");
    }

    return res.status(201)
    .json(new ApiResponse(200,createdUser,"User Registered successfully!!"))
})

const login = asyncHandler(async (req,res)=>{

    const {email,password} = req.body

    if(!email){
        throw new ApiError(400,"email is required")
    }
   
    const user = await User.findOne({
        email
    })
    if(!user){
        throw new ApiError(404,"User not found");
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Wrong password!!!");
    }
    const {accessToken,refreshToken} = await generateAccessTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{
        user: loggedInUser,accessToken,refreshToken
    },"User Logged In successfully"))
})

const logout = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(req.user?._id,{
        $unset: {refreshToken:1}
    })
    const options={
        httpOnly:true,
        secure: true
    }
    return res.status(200)
    .cookie("accessToken",options)
    .cookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out Successfully!!"))
})

export {signup,login,logout};