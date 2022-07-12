require("dotenv").config();
const db = require("../dbConnection");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    })
      .then(() => {
        console.log("Record Entered");
        res.status(200).json({ msg: "User Added Successfully!!" });
      })
      .catch((err) => {
        console.log(`Unable to Store the user  ${err}`);
        res.status(400).json({ msg: `Unable to Store the User  ${err}` });
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
      const token = jwt.sign({ email: findUser.email }, process.env.SECRET);
      console.log(token);

      // Put token into cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      // Sending Response to FrontEnd
      const { name, email, role } = findUser;
      res.status(200).json({ token, findUser: { name, email, role } });
    } else {
      res.status(200).json({ msg: "Credentials are invalid" });
    }
  }
};
