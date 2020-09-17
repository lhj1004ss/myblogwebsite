import express from "express";
import mongoose from "mongoose";
import config from "./config";
import postRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import searchRoutes from "./routes/api/search";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "path";

const prod = process.env.NODE_ENV === "production";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors({ origin: true, credentials: true }));

app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
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
//search
app.use("/api/search", searchRoutes);

if (prod) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

export default app;
