import express from "express";
import { getCategory, getAllCategories } from "../../controllers/article/categories/get";
import { addCategory } from "../../controllers/article/categories/add";
import router from "./content.routes";
import { deleteCategory } from "../../controllers/article/categories/delete";
import { updateCategory } from "../../controllers/article/categories/update";

router.post("/category/add", addCategory)
router.get("/category/getAllCategories", getAllCategories)
router.get("/category/getCategory", getCategory)
router.delete("/category/delete", deleteCategory)
router.patch("/category/update", updateCategory)

export default router