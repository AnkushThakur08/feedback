require("dotenv").config();
const db = require("../dbConnection");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var { expressjwt: expressjwt } = require("express-jwt");

const User = db.user;

exports.signup = async (req, res) => {
  console.log(req.body);

  let userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const find = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (find) {
    res.status(400).json({ msg: "User Already Registered" });
  } else {
    var value = req.body.password;
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(value, salt);
    console.log(hashPassword);

    const data = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    })
      .then(() => {
        console.log("Record Entered");
        res.status(200).json({ msg: "User Added Successfully!!" });
      })
      .catch((error) => {
        console.log(`Unable to Store the user  ${error}`);
        res.status(400).json({ msg: `Unable to Store the User  ${error}` });
      });
  }
};

exports.signIn = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!findUser) {
    res.status(400).json({ msg: "User email does not exist" });
  } else {
    const isMatch = await bcrypt.compare(req.body.password, findUser.password);
    console.log(req.body.password);
    console.log(findUser.password);
    console.log(isMatch);
    if (findUser.email && isMatch) {
      // Token generation
      const token = jwt.sign({ id: findUser.id }, process.env.SECRET);
      console.log(token);

      // Put token into cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      // Sending Response to FrontEnd
      const { id, name, email, role } = findUser;
      res.status(200).json({ token, findUser: { id, name, email, role } });
    } else {
      res.status(200).json({ msg: "Credentials are invalid" });
    }
  }
};

// PARAMS
exports.getById = (req, res, next, id) => {
  const data = User.findByPk(id).then((data) => {
    req.profile = data;
    next();
  });
};

exports.getUser = async (req, res) => {
  return res.json(req.profile);
};

exports.admin = async (req, res) => {
  res.status(200).json({ msg: `WELCOME ADMIN` });
};

// Protected Routes
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth", //This auth contents id of the user (res.json(req.auth))
  /* THIS WILL PUT THIS AUTH, inside every route */
});

// MIDDLEWARES
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile.id == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  // console.log(req);
  console.log(req.profile);
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "You are NOT ADMIN, ACCESS DENIED",
    });
  }
  next();
};
