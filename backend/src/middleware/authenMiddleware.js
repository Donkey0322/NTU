import jwt from 'jsonwebtoken';
import db from "../sql.js";

const Myquery = (query) => {
    return new Promise((resolve) => {
      db.query(query, (err, result) => {
        if (err) {
          throw err;
        } else {
            resolve(result);
          }
        }
      );
  })
  };

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'web programming', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/logIn');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/logIn');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'web programming', async (err, decodedToken) => {
      if (err) {
        res.user = null;
        next();
      } else {
        const query = `select * from customers where id = ${decodedToken.id}`
        let user = await Myquery(query);
        res.user = user[0].customer_name;
        next();
      }
    });
  } else {
    res.user = null;
    next();
  }
};


export default { requireAuth, checkUser };