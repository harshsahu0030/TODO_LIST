import express from "express";
import { isAuthenticated } from "../middleware/Auth.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controller/CategoryController.js";

const router = express.Router();

router.route("/category/create").post(isAuthenticated, createCategory);

router.route("/categories").get(isAuthenticated, getAllCategories);

router
  .route("/category/:id")
  .get(isAuthenticated, getCategory)
  .put(isAuthenticated, updateCategory)
  .delete(isAuthenticated, deleteCategory);

export default router;
