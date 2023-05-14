const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { user, jwtSecret } = require("./constants/user");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

app.use(cors());

app.use(express.json());

const strategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  },
  (payload, done) => {
    if (payload.id === user.id) {
      return done(null, user);
    } else {
      return done(new Error("User not found"), null);
    }
  }
);

passport.use(strategy);

require("./mongoose");

require("./routes/apiRoutes")(app);

app.listen(1333, () => {
  console.log("App listening on port 1333");
});
