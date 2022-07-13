const express = require("express");

const router = express.Router();

const {
  createFeedback,
  getAllFeedback,
  getIndividualFeedback,
  softdeleteFeedback,
  getImportantFeedback,
  filterComment,
  filterRating,
  deleteFeedback,
} = require("../controllers/feedback");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getUserById,
} = require("../controllers/auth");

router.param(
  "userId",
  getUserById
); /* This will populate req.profile in every route*/

router.post(
  "/createFeedback/:userId",
  isSignedIn,
  isAuthenticated,
  createFeedback
);

router.get("/getAllFeedback", getAllFeedback);

router.get("/getIndividualFeedback", getIndividualFeedback);

router.delete(
  "/deleteFeedback",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  softdeleteFeedback
);

router.get("/getImportantFeedback", getImportantFeedback);

router.get("/filterComment", filterComment);

router.get("/filterRating", filterRating);

router.delete(
  "/deleteFeedback/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteFeedback
);

module.exports = router;
