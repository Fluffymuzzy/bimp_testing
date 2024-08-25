import express from "express";
import {
  createTextMessageController,
  createFileMessageController,
  getMessagesController,
  getMessageContentByIdController
} from "../controllers/messagesController.js";

const router = express.Router();

const messagesRoutes = (upload) => {
  router.post("/text", createTextMessageController);
  router.post("/file", upload.single("file"), createFileMessageController);
  router.get("/list", getMessagesController);
  router.get("/content/:id", getMessageContentByIdController);
  return router;
};

export default messagesRoutes;
