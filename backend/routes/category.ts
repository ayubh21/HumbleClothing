import {
  createCategory,
  getAllCategories,
  getCategorybyId,
  updateCategory,
  deleteCategory,
} from "../controllers/category";
import express from "express";
const router = express.Router();
// category routes
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategorybyId);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
