/*
* All authentication endpoints
* for therapists and users
* */

import {Router} from "express";
import * as controller from "../controllers/auth.controller"
import {checkUserExists} from "../middleware/checkUserExists";

const router = Router()

router.post(
    '/register',
    [checkUserExists],
    controller.signup
)

router.post(
    '/login',
    controller.signin
)

export default router