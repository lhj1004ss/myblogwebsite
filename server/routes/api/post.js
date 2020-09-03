import express from "express";
import Post from "../../models/post";
import auth from "../../middleware/auth";
const router = express.Router();
// /api/post
router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, "all post");
  res.json(postFindResult);
});

router.post("/", auth, async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, writer } = req.body;
    const newPost = await Post.create({ title, contents, fileUrl, writer });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

export default router;
