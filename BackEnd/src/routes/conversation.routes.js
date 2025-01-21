import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {getAllConversation,getConversation,addUser,searchUser} from "../controllers/conversation.controller.js"

const router = Router()

router.use(verifyJWT)

router.route("/user/:username").post(addUser).get(getConversation)
router.route("/searchUser/:username").get(searchUser)
router.route("/allconversation").get(getAllConversation)


export default router
