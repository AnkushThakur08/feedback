const express = require("express");

const router = express.Router();

const {
  createFeedback,
  getAllFeedback,
  getIndividualFeedback,
  deleteFeedback,
  getImportantFeedback,
  filterComment,
  filterRating,
} = require("../controllers/feedback");

router.post("/createFeedback", createFeedback);

router.get("/getAllFeedback", getAllFeedback);

router.get("/getIndividualFeedback", getIndividualFeedback);

router.delete("/deleteFeedback", deleteFeedback);

router.get("/getImportantFeedback", getImportantFeedback);

router.get("/filterComment", filterComment);

router.get("/filterRating", filterRating);

module.exports = router;
