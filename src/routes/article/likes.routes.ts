import router from "./content.routes";
import { addLikes } from "../../controllers/article/likes/add";
import { getLikes } from "../../controllers/article/likes/get";
import { deleteLikes } from "../../controllers/article/likes/delete";

router.post("/likes/add", addLikes)
router.get("/likes/getLikes", getLikes)
router.delete("/likes/delete", deleteLikes)

export default router