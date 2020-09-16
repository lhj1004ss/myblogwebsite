import express from "express";
import Post from "../../models/post";
import Category from "../../models/category";
import Comment from "../../models/comment";
import User from "../../models/user";
import auth from "../../middleware/auth";
const router = express.Router();
// /api/post
import multer from "multer";
import dotenv from "dotenv";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import moment from "moment";
import { isNullOrUndefined } from "util";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "myblogimg/upload",
    // region: "canada",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

// create post, api/post/image
// private

router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    // map here is to show img when uploaded before actually posting
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});

// add infinite scroll,  /skip/:skip/
//get all post
router.get("/", async (req, res) => {
  try {
    const postFindResult = await Post.find();
    const result = { postFindResult };
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: "There is no more post available" });
  }
});

//   post api/post
//  create a Post
// private

router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, writer, category } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      writer: req.user.id,
      date: moment().format("MM-DD-YYYY hh:mm:ss"),
    });

    const findResult = await Category.findOne({
      categoryName: category,
    });

    console.log(findResult, "Find Result!!!!");
    //     ////if no category when post, make new category
    if (isNullOrUndefined(findResult)) {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    } else {
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, {
        category: findResult._id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
    }
    return res.redirect(`/api/post/${newPost._id}`);
  } catch (e) {
    console.log(e);
  }
});

// post api/post/:id
// go to detail page after posing successfully
// public

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("writer")
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id).populate({
      path: "comments",
    });
    const result = comment.comments;
    console.log(result, "comment load");
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

router.post("/:id/comments", async (req, res, next) => {
  console.log(req, "comments");
  const newComment = await Comment.create({
    contents: req.body.contents,
    writer: req.body.userId,
    writerName: req.body.userName,
    post: req.body.id,
    date: moment().format("MM-DD-YYYY hh:mm:ss"),
  });
  console.log(newComment, "newComment");

  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });
    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });
    res.json(newComment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// delete post
// api/post/:id

router.delete("/:id", auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });

  // delete category
  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }
  );
  // if no post, delete all category
  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }
  return res.json({ success: true });
});

// get api/post/:id/edit
// edit post

router.get("/:id/edit", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "writer",
      "firstname"
    );
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});

router.post("/:id/edit", auth, async (req, res, next) => {
  // const { title, contents, fileUrl, id } = req.body;

  const {
    body: { title, contents, fileUrl, id },
  } = req;

  console.log(req);
  try {
    const modifiedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        date: moment().format("MM-DD-YYYY hh:mm:ss"),
      },
      { new: true }
    );
    console.log("modifiedPost", modifiedPost);
    redirect(`/api/post/${modifiedPost.id}`);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
