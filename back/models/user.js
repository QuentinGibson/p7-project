module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  });
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "creatorId",
      onDelete: "CASCADE",
    });
    User.belongsToMany(models.Post, {
      through: "User_Post_Visit",
      onDelete: "CASCADE",
    });
    User.hasMany(models.Comment, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return User;
};
