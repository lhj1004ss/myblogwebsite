import express from "express";
import Post from "../../models/post";
import auth from "../../middleware/auth";
const router = express.Router();
// /api/post
import multer from "multer";
import dotenv from "dotenv";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
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
