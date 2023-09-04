import router from "./content.routes";
import { addFlag } from "../../controllers/article/flags/add";
import { getFlag, getAllFlags } from "../../controllers/article/flags/get";
import { deleteFlag } from "../../controllers/article/flags/delete";
import { updateFlag } from "../../controllers/article/flags/update";

router.post("/flags/add", addFlag)
router.get("/flags/getFlag", getFlag)
router.get("/flags/getAllFlags", getAllFlags)
router.delete("/flags/delete", deleteFlag)
router.patch("/flags/update", updateFlag)

export default router