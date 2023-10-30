import express from "express";
import { isAuthenticated } from "../middleware/Auth.js";
import {
  createTodo,
  deleteTodo,
  getAllTodolist,
  getTodo,
  getUserAllTodolist,
  updateTodo,
  updateTodoStatus,
} from "../controller/TodoController.js";
const router = express.Router();

router.route("/todo/create").post(isAuthenticated, createTodo);

router.route("/todolists").get(isAuthenticated, getUserAllTodolist);

router.route("/alltodolists").get(isAuthenticated, getAllTodolist);

router
  .route("/todo/:id")
  .get(isAuthenticated, getTodo)
  .put(isAuthenticated, updateTodo)
  .put(isAuthenticated, updateTodoStatus)
  .delete(isAuthenticated, deleteTodo);

router.route("/todo/status/:id").put(isAuthenticated, updateTodoStatus);

export default router;
