import jwt from "jsonwebtoken";
import db from "../sql.js";
import express from "express";
import moment from "moment";
import bcrypt from "bcrypt";
const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";
// send query
const Myquery = (query) => {
  return new Promise((resolve) => {
    db.query(query, (err, result) => {
      if (err) {
        throw err;
      } else {
        resolve(result);
      }
    });
  });
};

// check email password valid
class CheckCustomer {
  //判斷email格式
  async checkEmail(mail, errors) {
    const query = `select * from customers where mail = "${mail}"`;
    const result = await Myquery(query);
    if (result.length !== 1) {
      errors.mail = "That email is not registered.";
    }
    return errors;
  }
  async checkPassword(mail, password, errors) {
    const query = `select * from customers where mail = "${mail}"`;
    const result = await Myquery(query);
    if (result.length >= 1) {
      var response = bcrypt.compareSync(password, result[0].password);
      if (!response) {
        errors.password = "The password is incorrect.";
      }
    }
    return errors;
  }
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "web programming", {
    expiresIn: maxAge,
  });
};

var check = new CheckCustomer();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { data: {mail, password} } = req.body;
  let errors = { mail: "", password: "" };
  errors = await check.checkEmail(mail, errors);
  errors = await check.checkPassword(mail, password, errors);
  if (errors.mail || errors.password) {
    console.log(errors);
    res.status(400).json({ errors });
  } else {
    console.log("logIn succeed");
    // res.redirect('/');
    const query_in = `select * from customers where mail = "${mail}"`;
    const result = await Myquery(query_in);
    const token = createToken(result.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ result });
  }
});

router.get("/", (req, res) => {
  console.log(1);
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect(CLIENT_URL);
});

export default router;
