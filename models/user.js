module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "No Name Entered",
      required: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "No Email Entered",
      required: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },

    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  return User;
};
