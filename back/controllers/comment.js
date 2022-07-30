const db = require("../models");

module.exports = {
  updateComment: async function (req, res, next) {
    try {
      const { body } = req.body;
      const comment_id = req.params.id;
      const comment = await db.Comment.findByPk(comment_id);
      comment.body = body;
      comment
        .save()
        .then((data) => {
          res.status(200).json({ message: "Comment updated!" });
        })
        .catch((error) => {
          res.status(500).json({ message: error });
        });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  deleteComment: async function (req, res, next) {
    try {
      await db.Comment.destroy({
        where: { id: req.params.id },
      })
        .then((data) => {
          res.status(200).json({ message: "Comment removed!" });
        })
        .catch((error) => {
          res.status(500).json({ message: error });
        });
    } catch (error) {
      res.status(500).json({ message: JSON.stringify(error) });
    }
  },
};
