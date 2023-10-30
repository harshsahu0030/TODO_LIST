import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  myProfile,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controller/UserController.js";
import { isAuthenticated } from "../middleware/Auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/profile/update").put(isAuthenticated, updateProfile);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

export default router;
