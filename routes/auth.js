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
  getUserById,
} = require("../controllers/auth");

router.param(
  "userId",
  getUserById
); /* This will populate req.profile in every route*/

router.post("/signup", signup);

router.post("/signIn", signIn);

router.get("/Admin/:userId", isSignedIn, isAuthenticated, isAdmin, admin);

module.exports = router;
