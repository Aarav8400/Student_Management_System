import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connection.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

await connectDB();

import userRouter from "./router/user.routes.js";

//router declartion
app.use("/users", userRouter);
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
