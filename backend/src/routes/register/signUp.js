import jwt from "jsonwebtoken";
import db from "../../sql.js";
import express from "express";
import moment from "moment";
import bcrypt from "bcrypt";
const router = express.Router();

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
  checkEmailValidation(mail, errors) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(mail);
    if (!result) {
      errors.mail = "The email is not valid!";
    }
    return errors;
  }
  async checkEmailUnique(mail, errors) {
    const query = `select * from customers where mail = "${mail}"`;
    const result = await Myquery(query);
    if (result.length >= 1) {
      errors.mail = "The email is already registered!";
    }
    return errors;
  }
  checkPassword(password, errors) {
    if (password.length < 8) {
      errors.password = "Minimum password length is 8 characters";
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

// controller actions
// module.exports.signup_get = (req, res) => {
//     console.log('hieo')
//   res.render('signup');
// }

// module.exports.login_get = (req, res) => {
//   res.render('login');
// }

router.post("/", async (req, res) => {
  console.log(req.body.data);
  const { mail, password } = req.body.data;
  let errors = { mail: "", password: "" };
  errors = check.checkEmailValidation(mail, errors);
  errors = await check.checkEmailUnique(mail, errors);
  errors = check.checkPassword(password, errors);
  if (errors.mail || errors.password) {
    console.log(errors);
    res.status(400).json({ result: { errors } });
  } else {
    const passwordHash = bcrypt.hashSync(password, 10);
    const query = `insert into customers (mail, password) 
                    VALUES ( "${mail}", "${passwordHash}")`;
    await Myquery(query);
    const query_in = `select * from customers where mail = "${mail}"`;
    const result = await Myquery(query_in);
    const token = createToken(result[0].customer_id);
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ result });
  }
});

export default router;
