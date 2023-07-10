import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import commentsRouter from "./routers/commentsRouter.js";

const DB_URL = `mongodb+srv://admin:Dfhufcvfrttdrf20@cluster0.laldgpt.mongodb.net/`;
const PORT = 7777;

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use("/users", userRouter);
app.use("/post", postRouter);
app.use("/upload", uploadRouter);
app.use("/comments", commentsRouter);

async function startApp() {
  try {
    await mongoose
      //   .connect(process.env.MONGODB_URL)
      .connect(DB_URL)
      .then(() => {
        console.log("💾DB OK💾");
      })
      .catch((err) => console.log("🚫DB ERR🚫", err));

    app.listen(process.env.PORT || PORT, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("✔Server Success✔");
    });
  } catch (err) {
    console.log(err);
  }
}

startApp();
