import express from "express";
import Post from "../../models/post";
import Category from "../../models/category";
import User from "../../models/user";

import auth from "../../middleware/auth";
const router = express.Router();
// /api/post
import multer from "multer";
import dotenv from "dotenv";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
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
    region: "canada",
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

router.post("/image", uploadS3.array("upload,5"), async (req, res, next) => {
  try {
    console.log(req.files.map((img) => img.location));

    res.json({
      uploaded: true,
      // map here is to show img when uploaded before actually posting
      url: req.files.map((img) => img.location),
    });
  } catch (e) {
    console.error(e);
    res.json({ upload: false, url: null });
  }
});

router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log(postFindResult, "all post");
  res.json(postFindResult);
});

router.post("/", auth, uploadS3.none(), async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, writer, category } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      writer,
      date: moment().format("MM-DD-YYYY hh:mm:ss"),
    });
    const findResult = await Category.findOne({
      // categoryname from category model
      categoryName: category,
    });

    console.log("findresult(category)", findResult);
    ////if no category when post, make new category
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
      // category exists
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, { category: findResult._id });
      await User.findByIdAndUpdate(req.user.id, {
        $push: { posts: newPost._id },
      });
    }
    return res.redirect(`/api/post/${newPost._id}`);
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

// post api/post/:id
// go to detail page after posing successfully
// public

router.get("/:id", async (req, res, next) => {
  try {
    const post = await (await Post.findById(req.params.id))
      .populate("writer", "firstname", "lastname")
      .populate({ path: "category", select: "categoryName" });
  } catch (e) {
    console.error(e);
    next();
  }
});

export default router;
