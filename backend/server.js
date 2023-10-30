import connectDatabase from "./Database/Datebase.js";
import app from "./app.js";
import dotenv from "dotenv";

//dotenv
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}

//mongodb connection
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT);
});
