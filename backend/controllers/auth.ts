//
import { Request, Response } from "express";
import { createUser, getUserbyEmail } from "../db/user";
import { auth, random } from "../utils/utils";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.sendStatus(400).send({ error: "All fields are required" });
    }

    const user = await getUserbyEmail(email);

    if (!user || user.length > 0) {
      console.log(user);
      return res.sendStatus(400);
    }
    if (password.length() <= 8) {
      return res
        .sendStatus(400)
        .send({ err: "Password must be a minimum of 8 characters" });
    }
    const salt = random();
    const authenticatedUser = await createUser({
      username,
      email,
      salt,
      password: auth(salt, password),
    });

    return res.status(200).json(authenticatedUser).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
