import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import authRoutes from "./routes/authRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import { authentication } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/messages", authentication, messagesRoutes(upload));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
