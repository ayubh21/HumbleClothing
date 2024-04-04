//
// Products
import { db } from "../db/database";
import { products } from "../db/schema";
import { Product } from "../models/models";
import { eq } from "drizzle-orm";

export const addProduct = async (product: Product) => {
  if (product.productDescription == null) {
    console.log("product description cannot be null");
  }

  try {
    await db.insert(products).values({
      productDescription: product.productDescription,
      sku: product.sku,
      price: product.price.toString(),
      productImage: product.productImage,
    });
  } catch (error) {
    console.log(error);
  }
};
// pass in Pg datatype

export const getProductbyId = async (id: number) => {
  const rowId = await db.query.products.findFirst({
    where: eq(products.product_id, id),
  });
  if (rowId == null) {
    console.log("product id does not exist");
  }

  console.log(rowId);
  return rowId;
};

export const getProducts = async () => {
  const data = await db.query.products.findMany();
  if (data.length == 0) {
    console.log("failed to retrieve products");
  }
  return data;
};

export const updateProduct = async (id: number, product: Product) => {
  const updatedRow = await db
    .update(products)
    .set({
      productDescription: product.productDescription,
      sku: product.sku,
      price: product.price.toString(),
      productImage: product.productImage,
    })
    .where(eq(products.product_id, id))
    .returning();
  console.log(updatedRow);
  return updatedRow;
};

export async function deleteProduct(id: number) {
  try {
    await db.delete(products).where(eq(products.product_id, id));
  } catch (err) {
    console.log("delete failed");
  }
}
