// Products

// import { db } from "../db/database";
// import { products } from "../db/schema";
// import { Product } from "../models/models";
// import { eq, exists, sql } from "drizzle-orm";

import { Request, Response } from "express";
import { addProduct, getProducts } from "../db/products";
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

export const createProduct = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const p: Product = {
      productDescription: body.productDescription,
      sku: body.sku,
      productImage: body.productImage,
      price: body.price,
      categoryId: body.categoryId,
      inventoryId: body.InventoryId,
    };
    // console.log(p);
    await addProduct(p);
    res.send(p);
  } catch (err) {
    console.log(err);
    return res.send(400);
  }
};
