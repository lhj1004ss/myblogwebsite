import express from "express";
import mongoose from "mongoose";
import config from "./config";
import postRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";

import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));

app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log(e));

// use routes

app.get("/");
app.use("/api/post", postRoutes);
// register
app.use("/api/user", userRoutes);
// login
app.use("/api/auth", authRoutes);

export default app;
