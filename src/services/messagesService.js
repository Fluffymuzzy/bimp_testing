import { PrismaClient } from "@prisma/client";
import {
  messageTextSchema,
  messageFileSchema,
} from "../validators/messageValidator.js";

const prisma = new PrismaClient();

export const createTextMessage = async ({ userId, text }) => {
  const { error } = messageTextSchema.validate({ text });
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }

  try {
    const message = await prisma.message.create({
      data: {
        userId,
        type: "text",
        content: text,
      },
    });

    return {
      status: 201,
      message: "Message created successfully",
      data: message,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const createFileMessage = async ({ userId, file }) => {
  const { error } = messageFileSchema.validate({ file });
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }

  try {
    const message = await prisma.message.create({
      data: {
        userId,
        type: "file",
        content: file.path,
        filename: file.originalname,
      },
    });

    return {
      status: 201,
      message: "Message created successfully",
      data: message,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const getMessages = async ({ page, limit }) => {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const offset = (pageNumber - 1) * limitNumber;

  try {
    const messages = await prisma.message.findMany({
      skip: offset,
      take: limitNumber,
      include: {
        user: true,
      },
    });

    const totalMessages = await prisma.message.count();
    return {
      status: 200,
      message: "Messages fetched successfully",
      data: {
        messages,
        total: totalMessages,
        page: pageNumber,
        limit: limitNumber,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const getMessageContentById = async (id) => {
  try {
    const message = await prisma.message.findUnique({
      where: {
        id: id,
      },
    });

    if (!message) {
      return {
        status: 404,
        message: "Message not found",
      };
    }

    return {
      status: 200,
      message: "Message content fetched successfully",
      data: {
        content: message.content,
        type: message.type,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
