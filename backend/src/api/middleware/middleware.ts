import { NextFunction } from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { getUserByToken } from "../db/user";
dotenv.config();
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionToken = req.cookies[process.env.SESSION_TOKEN as string];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const result = await getUserByToken(sessionToken);

    if (!result || result.length === 0) {
      return res.sendStatus(403);
    }
    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
