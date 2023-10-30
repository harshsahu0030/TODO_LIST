import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "You must be logged in",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decoded._id);

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
