import express from "express";
import cookieParser from "cookie-parser";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//import routes
import user from "./routes/UserRoute.js";
import todo from "./routes/TodoRoute.js";
import category from "./routes/CategoryRoute.js";

//using routes
app.use("/api/v1", user);
app.use("/api/v1", todo);
app.use("/api/v1", category);

export default app;
