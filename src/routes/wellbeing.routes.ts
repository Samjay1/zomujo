import { Router } from "express";
import { getQuestions,getResults, getUserTestHistory } from "../controllers/wellbeing.controller";
const router:Router = Router()

router.get('/questions/:type', getQuestions)
router.post('/results', getResults)
router.get('/history', getUserTestHistory)
export default router