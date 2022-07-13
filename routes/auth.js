const { Router } = require("express");
const express = require("express");

const router = express.Router();

const {
  signup,
  signIn,
  isSignedIn,
  admin,
  isAuthenticated,
  isAdmin,
  getById,
  getUser,
} = require("../controllers/auth");

router.param(
  "adminId",
  getById
); /* This will populate req.profile in every route*/

router.post("/signup", signup);

router.post("/signIn", signIn);

router.get("/Admin/:adminId", isSignedIn, isAuthenticated, isAdmin, admin);

router.get("/user/:adminId", getUser);

router.get("/admin1/:adminId", isAuthenticated, (req, res) => {
  res.json(req.profile);
});
// router.get("/Admin/", isSignedIn, isAdmin, admin);

module.exports = router;
