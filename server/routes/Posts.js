

// const express = require("express");
// const router = express.Router();
// const { Posts, Likes } = require("../models");

// const { validateToken } = require("../middlewares/AuthMiddleware");

// router.get("/", async (req, res) => {
//   const listOfPosts = await Posts.findAll({ include: [Likes] });
//   res.json(listOfPosts);
// });

// router.get("/byId/:id", async (req, res) => {
//   const id = req.params.id;
//   const post = await Posts.findByPk(id);
//   res.json(post);
// });


// router.get("/byuserId/:id", async (req, res) => {
//   const id = req.params.id;
//   const listOfPosts = await Posts.findAll({
//     where: { UserId: id },
//     include: [Likes],
//   });
//   res.json(listOfPosts);
// });



// router.post("/", validateToken, async (req, res) => {
//   const post = req.body;
//   post.username = req.user.username;
//   post.UserId = req.user.id;
//   await Posts.create(post);
//   res.json(post);
// });


// router.delete("/:postId", validateToken, async (req, res) => {
//   const postId = req.params.postId;
//   await Posts.destroy({
//     where: {
//       id: postId,
//     },
//   });

//   res.json("DELETED SUCCESSFULLY");
// });

// module.exports = router;






// const express = require("express");
// const router = express.Router();
// const { Posts, Likes } = require("../models");

// const { validateToken } = require("../middlewares/AuthMiddleware");

// router.get("/", async (req, res) => {
//   const listOfPosts = await Posts.findAll({ include: [Likes] });
//   res.json(listOfPosts);;
// });

// router.get("/byId/:id", async (req, res) => {
//   const id = req.params.id;
//   const post = await Posts.findByPk(id);
//   res.json(post);
// });

// router.post("/", async (req, res) => {
//   const post = req.body;
//   await Posts.create(post);
//   res.json(post);
// });

// module.exports = router;







const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});


router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});



router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});


router.put("/title", validateToken, async (req, res) => {
  const { id, newTitle } = req.body;
  try {
    const post = await Posts.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (post.username !== req.user.username) {
      return res.status(403).json({ error: "Unauthorized action." });
    }

    post.title = newTitle;
    await post.save();
    res.json({ message: "Title updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update title." });
  }
});

// Update post body
router.put("/postText", validateToken, async (req, res) => {
  const { id, newText } = req.body;
  try {
    const post = await Posts.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (post.username !== req.user.username) {
      return res.status(403).json({ error: "Unauthorized action." });
    }

    post.postText = newText;
    await post.save();
    res.json({ message: "Body updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update body." });
  }
});


router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;