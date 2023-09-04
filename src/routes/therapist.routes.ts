import {Router} from "express";
import * as controller from '../controllers/therapist.controller'
import {checkTherapistExists} from "../middleware/checkTherapistExists";

const router = Router()

router.post('/signup',
    [checkTherapistExists],
    controller.signup)

router.post('/signin',
    controller.signin)

router.get('/:id',
    controller.getTherapistInformation)

router.put('/profile/:id',
    controller.updateTherapistProfile)

router.put('/data/:id',
    controller.updateTherapistData)

export default router