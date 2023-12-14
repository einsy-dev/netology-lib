import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const { PORT, MONGO_URL } = require("dotenv").config().parsed;

// Auth middleware package
import session from "express-session";
import passport from "./middleware/passport";

// import routes
import router from "./routes/api";
import appRouter from "./routes/app";
import userRouter from "./routes/api/userRouter";
const port = PORT || 3000;

// Passport files
// Passport files

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "SECRET", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use("/app", appRouter);
app.use("/api", router);
app.use("/user", userRouter);
app.use("/", (req, res) => res.redirect("/app"));

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log("err" + error);
  }
};

start();
