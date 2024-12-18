const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;

  try {
    const newComment = await Comments.create(comment); // Create comment and get the full record
    res.json(newComment); // Return the created comment, including its ID
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  try {
    await Comments.destroy({
      where: {
        id: commentId,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

module.exports = router;