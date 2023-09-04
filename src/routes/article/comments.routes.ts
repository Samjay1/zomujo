import router from "./content.routes";
import { addComment } from "../../controllers/article/comments/add";
import { getAllComments, getComment } from "../../controllers/article/comments/get";
import { deleteComment } from "../../controllers/article/comments/delete";
import { updateComment } from "../../controllers/article/comments/update";

router.post("/comments/add", addComment)
router.get("/comments/getComment", getComment)
router.get("/comments/getAllComments", getAllComments)
router.delete("/comments/delete", deleteComment)
router.patch("/comments/update", updateComment)

export default router