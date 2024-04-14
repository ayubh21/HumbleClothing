import { Request, Response } from "express";
import { createUser, getUsers } from "../db/user";
import { User } from "../models/models";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const u: User = {
      username: body.username,
      email: body.email,
      password: body.password,
    };

    const users = await createUser(u);
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const getAllUser = async (_req: Request, res: Response) => {
  try {
    const user = await getUsers();
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
