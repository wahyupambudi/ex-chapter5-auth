require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const port = process.env.PORT || 3000;

const router = require("./route/routes")

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
  secret: 'rahasia',
  resave: true,
  saveUninitialized: true
}))

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
