import {Router} from "express"
import {login,logout,signup} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/signup").post(upload.fields(
    [
        {
            name:"avatar",
            maxCount:1
        }
    ]
),signup)

router.route("/login").post(upload.none(),login)

router.route("/logout").post(verifyJWT,logout)


export default router;