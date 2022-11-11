import express from "express";
const app = express();
import connectDB from "./db/connect.js";
import { join } from "path";
import dotenv from "dotenv";
import path from "path";
import { urlRouter } from "./routes/urls.js";
import { indexRouter } from "./routes/index.js";
import logger from "morgan";
dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(logger("dev"));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", urlRouter);
app.use("/", indexRouter);
const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`server started, listening PORT ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
