module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "creatorId",
      onDelete: "CASCADE",
    });
    Post.belongsToMany(models.User, {
      through: "User_Post_Visit",
      onDelete: "CASCADE",
    });
  };
  return Post;
};
