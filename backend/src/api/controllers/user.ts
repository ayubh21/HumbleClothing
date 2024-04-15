import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getUserbyEmail,
  getUserbyId,
  getUsers,
} from "../db/user";
import { User } from "../models/models";
import { auth, random } from "../utils/utils";

export const handleAddUser = async (req: Request, res: Response) => {
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
    return res.sendStatus(500);
  }
};

export const handleGetAllUser = async (_req: Request, res: Response) => {
  try {
    const user = await getUsers();
    if (user == undefined) {
      return res.sendStatus(400).send({ error: "error in fetching users" });
    }
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const handleGetUserbyEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await getUserbyEmail(email);
    if (user == undefined) {
      return res
        .sendStatus(404)
        .send({ error: "could not find user with provided email" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const handleGetUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await getUserbyId(id);

    if (user == undefined) {
      // if this was an existing user
      return res.status(404).send({ error: "no users found" });
    } else {
      return res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const handleUpdateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const salt = random();
    const user: User = {
      username: body.username,
      email: body.email,
      password: auth(salt, body.password),
    };

    if (id == undefined) {
      return res
        .sendStatus(404)
        .send({ error: "unable to find user with this id" });
    }
    const updatedUser = await editUser(id, user);
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id == undefined) {
      return res
        .status(404)
        .send({ error: "unable to find user with this id" });
    }
    const deletedUser = await deleteUser(id);
    res.json(deletedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
