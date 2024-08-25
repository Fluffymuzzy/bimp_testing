import {
  createFileMessage,
  createTextMessage,
  getMessages,
  getMessageContentById,
} from "../services/messagesService.js";
import path from "path";

export const createTextMessageController = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id;
  const { status, message, data } = await createTextMessage({ userId, text });
  res.status(status).json({ message, data });
};

export const createFileMessageController = async (req, res) => {
  const file = req.file;
  const userId = req.user.id;
  const { status, message, data } = await createFileMessage({ userId, file });
  res.status(status).json({ message, data });
};

export const getMessagesController = async (req, res) => {
  const { page, limit } = req.query;
  const { status, message, data } = await getMessages({ page, limit });
  res.status(status).json({ message, data });
};

export const getMessageContentByIdController = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await getMessageContentById(id);

  if (status !== 200) {
    return res.status(status).json({ message });
  }

  const contentType =
    data.type === "text"
      ? "text/plain"
      : data.type || "application/octet-stream";
  res.setHeader("Content-Type", contentType);

  if (data.type === "file") {
    const filePath = path.resolve(process.cwd(), data.content);
    return res.sendFile(filePath);
  }

  res.status(status).send(data.content);
};
