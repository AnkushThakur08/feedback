const db = require("../dbConnection");
const { Sequelize } = require("sequelize");

// FIXME: JOI
// const Joi = require("joi");
// const Helper = require("../helper/joiHelper");

const Feedback = db.feedback;
const User = db.user;

exports.createFeedback = async (req, res) => {
  var data = req.body;

  // FIXME:JOI
  // const schema = Joi.object({
  //   comment: Joi.string().valid("Positive", "Negative", "Neutral"),
  //   rating: Joi.string().valid("1Star", "2Star", "3Star", "4Star", "5Star"),
  // });

  // let validData = await Helper.verifyjoiSchema(data, schema);

  // if(!validData) {
  //   console.log();
  // }

  console.log(req.body);
  var data = await Feedback.create({
    FeedbackInfo: req.body.FeedbackInfo,
    comment: req.body.comment,
    rating: req.body.rating,
    userId: req.body.userId,
  })
    .then(() => {
      console.log("Feedback Entered Successfully");
      res.status(200).json({ msg: `FeedBack Recorded` });
    })
    .catch((error) => {
      console.log(`Unable to store the user ${error}`);
      res.status(400).json({ msg: `Unable to Store the User  ${error}` });
    });
};

exports.getAllFeedback = async (req, res) => {
  try {
    const data = await Feedback.findAll({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: `Unable to show th user ${error}` });
  }
};

exports.getIndividualFeedback = async (req, res) => {
  const data = await Feedback.findOne({
    attributes: ["id", "FeedbackInfo", "comment", "rating"],
    include: [
      {
        attributes: [
          ["name", "User_Name"],
          ["email", "User_Email"],
        ],
        model: User,
      },
    ],
    where: {
      id: req.body.id,
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ msg: `Unable to retrieve the user ${error}` });
    });
};

// CONNECTION
db.user.hasOne(db.feedback, {
  foreignKey: "userId",
});
db.feedback.belongsTo(db.user, {
  foreignKey: "userId",
});

exports.deleteFeedback = async (req, res) => {
  const data = await Feedback.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then(() => {
      res.status(200).json({ msg: `Feedback deleted successfully` });
    })
    .catch((error) => {
      res.status(400).json({ msg: `Unable to delete the feedback ${error}` });
    });
};

exports.getImportantFeedback = async (req, res) => {
  const data = await Feedback.findAndCountAll({
    attributes: ["id", "FeedbackInfo", "comment", "rating", "userId"],
    where: {
      deletedAt: null,
    },
  })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(400).json({ msg: `Unable to find  the user ${error}` });
    });
};

exports.filterComment = async (req, res) => {
  const data = await Feedback.findAndCountAll({
    attributes: ["id", "FeedbackInfo", "comment", "rating", "userId"],

    where: {
      comment: req.body.comment,
    },
  })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(400).json({ msg: `Unabel to filter the Comments ${error}` });
    });
};

exports.filterRating = async (req, res) => {
  const data = await Feedback.findAndCountAll({
    attributes: ["id", "FeedbackInfo", "comment", "rating", "userId"],

    where: {
      rating: req.body.rating,
    },
  })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(400).json({ msg: `Unable to Filter the rating ${error}` });
    });
};

