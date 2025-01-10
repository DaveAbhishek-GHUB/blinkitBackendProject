const express = require("express");
const app = express();
const session = require("express-session");
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const passport = require("passport");
const path = require("path");
require("./config/googleOAuthConfig");

require("dotenv").config();
require("./config/db")();

// Make sure SESSION_SECRET is defined in .env file
if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be defined in environment variables');
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
