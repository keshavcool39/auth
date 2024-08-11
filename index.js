require("dotenv").config();
require("./models/db");

const bodyParser = require("body-parser");
const cors = require("cors");

const AuthRou = require("./Routes/AuthRouter");

const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("./Middleware/AuthValidation");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRou);
app.use("/news", AuthRou);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
