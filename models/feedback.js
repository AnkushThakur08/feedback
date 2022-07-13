module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("Feedback", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      primaryKey: true,
    },

    FeedbackInfo: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Neutral",
      required: true,
    },

    rating: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "5 Star",
      required: true,
      trim: true,
    },

    userId: {
      type: DataTypes.STRING,
    },
  });
  return Feedback;
};
