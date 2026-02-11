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
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'web programming', async (err, decodedToken) => {
      if (err) {
        // console.log('err')
        res.locals.user = null;
      } else {
        // console.log('success')
        let query = `select * from customers where customer_id = ${decodedToken.id}`
        const result = await Myquery(query)
        res.locals.user = result[0].customer_id;
        // console.log(res.locals.user)
      }
    });
  } else {
    res.locals.user = null;
  }
  next();
};


export { requireAuth, checkUser };