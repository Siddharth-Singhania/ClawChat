import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {sendMessage} from "../controllers/message.controller.js"



const router = Router()

router.use(verifyJWT)

router.route("/send/:username").post(sendMessage)

export default router