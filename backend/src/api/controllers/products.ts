// Products
//
// import { db } from "../db/database";
// import { products } from "../db/schema";
// import { Product } from "../models/models";
// import { eq, exists, sql } from "drizzle-orm";

import { Request, Response } from "express";
import {
  addProduct,
  deleteP,
  getProductbyId,
  getProducts,
  updateProduct,
} from "../db/products";
import { Product } from "../models/models";
import { parseInt } from "lodash";
// CRUD

// fetch products
export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.send(400);
  }
};
// fetch products by Id
export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const p = await getProductbyId(id);

    if (p == undefined) {
      return res.sendStatus(404);
    } else {
      res.json(p);
      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
  }
};

// add product
export const createProduct = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const p: Product = {
      productDescription: body.productDescription,
      sku: body.sku,
      productImage: body.productImage,
      price: body.price,
      categoryId: body.categoryId,
      inventoryId: body.inventoryId,
    };
    await addProduct(p);
  } catch (err) {
    console.log(err);
    return res.send(400);
  }
};
// edit Product
export const editProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { body } = req;
    const p: Product = {
      productDescription: body.productDescription,
      sku: body.sku,
      productImage: body.productImage,
      price: body.price,
    };
    await updateProduct(id, p);
    res.status(200).json(p);
    // return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.send(400);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const d = await deleteP(id);

    if (d != undefined) {
      return res.sendStatus(404);
    } else {
      console.log(`product with id ${id} has been successfully deleted`);
      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
  }
};
