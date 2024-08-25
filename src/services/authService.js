import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { userSchema, loginSchema } from "../validators/userValidator.js";
import { generateBase64AuthString } from "../utils/authUtils.js";

const prisma = new PrismaClient();

export const registerUser = async ({ name, surname, email, password }) => {
  const { error } = userSchema.validate({ name, surname, email, password });
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
      },
    });

    const authString = generateBase64AuthString(email, password);
    return {
      status: 201,
      message: "User created successfully",
      user: `Basic ${authString}`,
    };
  } catch (error) {
    if (
      error.code === "P2002" &&
      error.meta &&
      error.meta.target.includes("email")
    ) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && bcrypt.compare(password, user.password)) {
      const authString = generateBase64AuthString(email, password);
      return {
        status: 200,
        message: "User logged in successfully",
        user: `Basic ${authString}`,
      };
    }

    return {
      status: 401,
      message: error.message,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
