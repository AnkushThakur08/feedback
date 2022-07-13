const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("feedback", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection established Successfully!!`);
  })
  .catch(() => {
    console.log(`Unable to Establish Connection!!!`);
  });

//   Storing the Connection
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/user")(sequelize, DataTypes);
db.feedback = require("./models/feedback")(sequelize, DataTypes);

// RELATION;
db.user.hasOne(db.feedback, {
  foreignKey: "userId",
});
db.feedback.belongsTo(db.user, {
  foreignKey: "userId",
});

db.sequelize.sync({ alter: true }).then(() => {
  console.log(`Successfully SYNCED!!`);
});

module.exports = db;
