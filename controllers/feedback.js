const db = require("../dbConnection");
const { Sequelize } = require("sequelize");

const Feedback = db.feedback;
const User = db.user;

exports.createFeedback = async (req, res) => {
  console.log(req.body);

  const data = await Feedback.create({
    id: req.body.id,
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
      res.status(400).json({ msg: `Unable to Store the User  ${err}` });
    });
};

exports.getAllFeedback = async (req, res) => {
  const data = await Feedback.findAll({});
  res.status(200).json(data);
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
  });
  res.status(200).json(data);
};

// CONNECTION
db.user.hasOne(db.feedback, {
  foreignKey: "userId",
});
db.feedback.belongsTo(db.user, {
  foreignKey: "userId",
});
