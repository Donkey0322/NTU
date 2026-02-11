import sql from "./sql.js";
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import bodyparser from 'body-parser';
import {requireAuth, checkUser } from './middleware/authMiddleWare.js';
import * as path from 'path';


sql.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // dataInit(sql);
});

const app = express();
app.use(cookieSession({ name: "session", keys: ["web programming"], maxAge: 3 * 24 * 60 * 60 * 100 , httpOnly: false}));



app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// init middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json())


// define routes
app.use("/*", checkUser);
app.use("/", router);


// define server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
