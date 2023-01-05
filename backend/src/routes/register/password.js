import db from "../../sql.js";
import express from "express";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = "web programming";

const router = express.Router();

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

router.post("/forgot-password", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  try {
    let query = `select * from customers where mail = "${email}"`;
    const result = await Myquery(query);
    console.log(result);
    if (result.length < 1) {
      return res.status(400).json({ errors: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + result[0].password;
    const token = jwt.sign(
      { email: result[0].mail, id: result[0].customer_id },
      secret,
      {
        expiresIn: "5m",
      }
    );
    // const link = `http://localhost:4000/password/reset-password/${result[0].customer_id}/${token}`;
    const link = `http://localhost:3000/reset?customer_id=${result[0].customer_id}&token=${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "grospatisserie@gmail.com",
        pass: "dzsweuxtgmmgplrt",
      },
    });
    console.log(result[0].mail);
    var mailOptions = {
      from: "grospatisserie@gmail.com",
      to: result[0].mail,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  let query = `select * from customers where customer_id = ${id}`;
  const result = await Myquery(query);
  if (result.length < 1) {
    return res.status(400).json({ errors: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + result[0].password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Verified" }); //, url:
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  let query = `select * from customers where customer_id = ${id}`;
  const result = await Myquery(query);
  if (result.length < 1) {
    return res.status(400).json({ errors: "User Not Exists!!" });
  } else if (password.length < 8) {
    return res
      .status(400)
      .json({ errors: "Minimum password length is 8 characters" });
  }
  const secret = JWT_SECRET + result[0].password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    query = `update customers set
               password = "${encryptedPassword}"
               where customer_id = ${id}; `;
    // res.render("index", { email: verify.email, status: "verified" });
    const result = await Myquery(query);
    // console.log(query)
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

export default router;
