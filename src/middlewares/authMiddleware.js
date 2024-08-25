import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.setHeader("WWW-Authenticate", "Bearer");
    return res.status(401).json({ message: "You are not authenticated" });
  }

  const auth = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const email = auth[0];
  const password = auth[1];

  const validUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (validUser && (await bcrypt.compare(password, validUser.password))) {
    req.user = validUser;
    next();
  } else {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).json({ message: "You are not authenticated" });
  }
};
