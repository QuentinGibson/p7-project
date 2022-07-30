module.exports = (sequelize, DataTypes) => {
  const UserPostVisit = sequelize.define("User_Post_Visit", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  return UserPostVisit;
};
