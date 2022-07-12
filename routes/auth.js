const express = require("express");

const router = express.Router();

const { signup, signIn } = require("../controllers/auth");

router.post("/signup", signup);

router.post("/signIn", signIn);

module.exports = router;
