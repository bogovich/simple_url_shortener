import express from "express";
const app = express();
import connectDB from "./config/connect.js";
import { join } from "path";
import dotenv from "dotenv";
import path from "path";
import { urlRouter } from "./routes/urls.js";
import { authRouter } from "./routes/auth.js";
import logger from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import MongoStore from "connect-mongo";
//import { scheduler } from "./scheduler/delete-schedule.js";

// MAIN
dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.disable("x-powered-by");
app.use(logger("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport setup
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  ttl: 20000,
});

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    cookie: { sameSite: true, maxAge: 2000000, httpOnly: true, signed: true },
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use("/", urlRouter);
app.use("/", authRouter);

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
