// Products

// import { db } from "../db/database";
// import { products } from "../db/schema";
// import { Product } from "../models/models";
// import { eq, exists, sql } from "drizzle-orm";

import { Request, Response } from "express";
import {
  addProduct,
  getProductbyId,
  getProducts,
  updateProduct,
} from "../db/products";
import { Product } from "../models/models";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.send(400);
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const p = await getProductbyId(id);
    if (res.statusCode !== 200) {
      console.log("error in fetching product");
    } else {
      res.json(p);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

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

export const modifyProduct = async (req: Request, res: Response) => {
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
