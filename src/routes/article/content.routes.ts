import express,  { Router} from "express";
import { getAllContent, getContent } from "../../controllers/article/content/get";
import { addContent } from "../../controllers/article/content/add";
const router: Router = express.Router()

router.post("/content/add", addContent)
router.get("/content/getAllContent", getAllContent)
router.get("/content/getContent", getContent)

export default router