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
); /* NOT IN SWAGGER */

router.get("/getAllFeedback", getAllFeedback);

router.post("/getIndividualFeedback", getIndividualFeedback);

router.delete(
  "/deleteFeedback",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  softdeleteFeedback
); /* TODO: NOT IN SWAGGER */

router.get("/getImportantFeedback", getImportantFeedback);

router.post("/filterComment", filterComment);

router.post("/filterRating", filterRating);

router.delete(
  "/deleteFeedback/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteFeedback
); /* TODO: */

module.exports = router;
