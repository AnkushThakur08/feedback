const express = require("express");

const router = express.Router();

const {
  createFeedback,
  getAllFeedback,
  getIndividualFeedback,
} = require("../controllers/feedback");

router.post("/createFeedback", createFeedback);

router.get("/getAllFeedback", getAllFeedback);

router.get("/getIndividualFeedback", getIndividualFeedback);

module.exports = router;
