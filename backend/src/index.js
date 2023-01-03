import sql from "./sql.js";
import express from "express";
import cors from "cors";
import { dataInit } from "./upload.js";
import passport from "passport";
import cookieSession from "cookie-session";
import router from "./routes/index.js";
import bodyparser from 'body-parser';

sql.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  dataInit(sql);
});

const app = express();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

// init middleware
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
// define routes
// app.use("/", test);
app.use("/", router);

// define server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
