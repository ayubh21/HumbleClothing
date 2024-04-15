//
import { Request, Response } from "express";
import { createUser, editUser, getUserbyEmail } from "../db/user";
import { auth, random } from "../utils/utils";
import dotenv from "dotenv";

dotenv.config();
export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.sendStatus(400).send({ error: "All fields are required" });
    }
    const user = await getUserbyEmail(email);

    if (user?.length !== 0) {
      console.log(user);
      return res.send({ error: "email already exists!" }).status(400);
    }
    if (password.length <= 8) {
      return res
        .status(400)
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

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const data = await getUserbyEmail(email);

    if (!data || data.length === 0) {
      return res.sendStatus(400);
    }

    const user = data[0];

    // checking to see if password belongs to specified user
    const expectedHash = auth(user.salt, password);
    if (user.password !== expectedHash) {
      console.log(expectedHash);
      return res.status(403).send({ error: "Unauthorized" });
    }

    user.sessionToken = auth(random(), user.password);

    const updatedUser = await editUser(user.userid, user);

    res.cookie(process.env.SESSION_TOKEN as string, user.sessionToken, {
      domain: process.env.DOMAIN,
      path: "/",
      expires: new Date(Date.now() + 9000000),
    });

    const resObj = {
      success: "logged in success",
      user: updatedUser,
    };
    return res.send(resObj);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
