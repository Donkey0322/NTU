import passportGoogle from 'passport-google-oauth';
import passportFacebook from 'passport-facebook';
import db from "../sql.js";
const GoogleStrategy = passportGoogle.OAuth2Strategy;
const FacebookStrategy = passportFacebook.Strategy;

import passport from "passport";
import bcrypt from 'bcrypt';

const GOOGLE_CLIENT_ID ="REMOVED";
const GOOGLE_CLIENT_SECRET = "REMOVED";

// GITHUB_CLIENT_ID = "your id";
// GITHUB_CLIENT_SECRET = "your id";

const FACEBOOK_APP_ID = "519147136879109";
const FACEBOOK_APP_SECRET = "153f0e2a06ca478eec785d1f28c8b36f";

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

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async function (accessToken, refreshToken, profile, done) {
      const {email, name} = profile._json;
      let query = `select * from customers where mail = "${email}"`;
      const result = await Myquery(query);
      if(result.length >= 1){
        return done(null, result)
      }else{
        const password = Math.random().toString(36).slice(-8); 
        const passwordHash = bcrypt.hashSync(password, 10);
        const query = `insert into customers (customer_name, mail, password) 
                    VALUES ("${name}",  "${email}", "${passwordHash}")`;
        await Myquery(query);
        const query_in = `select * from customers where mail = "${email}"`  
        const result = await Myquery(query_in)  
        return done(null, result) 
      }

    }
  )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
        async function (accessToken, refreshToken, profile, done) {
           const {email, name} = profile._json;
           console.log(profile)
           let query = `select * from customers where mail = "${email}"`;
           const result = await Myquery(query);
           if(result){
             return done(null, result)
           }else{
             const password = Math.random().toString(36).slice(-8); 
             console.log(password)
             const passwordHash = bcrypt.hashSync(password, 10);
             console.log(passwordHash)
             const query = `insert into customers (customer_name, mail, password) 
                         VALUES ("${name}",  "${email}", "${passwordHash}")`;
             await Myquery(query);
             const query_in = `select * from customers where mail = "${mail}"`  
             const result = await Myquery(query_in)  
             return done(null, result) 
           }
     
         }
    
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});