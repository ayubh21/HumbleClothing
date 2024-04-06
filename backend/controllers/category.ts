// category mockup data

import {
  addCategory,
  editCategory,
  getCategories,
  getCategory,
} from "../db/category";
import { Request, Response } from "express";
import { Category, editC } from "../models/models";
import { isEmpty } from "lodash";
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    let c: Category = {
      id: body.id,
      name: body.name,
      categoryDescription: body.categoryDescription,
    };
    await addCategory(c);
    res.send(c);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const getAllCategories = async (_: Request, res: Response) => {
  try {
    const c = await getCategories();
    res.json(c);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const getCategorybyId = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const c = await getCategory(id);
    console.log(c);
    if (c == undefined) {
      return res.send(400);
    } else {
      res.json(c);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const id = parseInt(req.params.id);
    const record = await getCategory(id);

    if (record == null) {
      return res.sendStatus(400);
    }
    const c: editC = {
      categoryDescription: body.categoryDescription,
      name: body.name,
    };
    const category = await editCategory(id, c);
    res.send(category);
  } catch (err) {
    console.log(err);
    return res.send(400);
  }
};
