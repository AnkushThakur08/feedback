module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        required: true,
        primaryKey: true,
        autoincrement: true,
        defaultValue: DataTypes.UUIDV4,
      },

      FeedbackInfo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        trim: true,
      },

      comment: {
        // type: DataTypes.ENUM("Positive", "Negative", "Neutral"),
        // values: ["Positive", "Negative", "Neutral"],
        // defaultValue: "Neutral",
        type: DataTypes.STRING,
        validate: {
          isIn: [["Positive", "Negative", "Neutral"]],
        },
        required: true,
      },

      rating: {
        // type: DataTypes.ENUM("1Star", "2Star", "3Star", "4Star", "5Star"),
        // values: ["1Star", "2Star", "3Star", "4Star", "5Star"],
        type: DataTypes.STRING,
        validate: {
          isIn: [["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]],
        },
        required: true,
      },

      userId: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return Feedback;
};
