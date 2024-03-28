// Products
import { db } from "../db/database";
import { products } from "../db/schema";
import { Product } from "../models/models";
import { eq, exists, sql } from "drizzle-orm";

export const product = [
  {
    productDescription: "Qamis Qabail Qc Subtile white",
    sku: "QAMIS-WHITE",
    price: "49.99",
    categoryId: 1,
    inventoryId: 1,
    productImage:
      "https://sounnahstore.com/10241-large_default/qamis-qabail-qc-subtil-.jpg",
  },
  {
    productDescription: "Qamis Qabail Qc Subtile Black and Purple",
    sku: "QAMIS-BLACK-PURPLE",
    price: "40.00",
    categoryId: 1,
    inventoryId: 1,
    productImage:
      "https://sounnahstore.com/10236-large_default/qamis-qabail-qc-subtil-.jpg",
  },
  {
    productDescription: "QAMIS EMBROIDERED QABAIL SHAM TAUPE",
    sku: "DN-015",
    price: "48.33",
    categoryId: 1,
    inventoryId: 1,
    productImage:
      "https://sounnahstore.com/9588-large_default/qamis-embroidered-qabail-sham-taupe.jpg",
  },
  {
    productDescription: "QAMIS EMBROIDERED QABAIL SHAM MIDNIGHT BLUE",
    sku: "DN-016",
    price: "49.99",
    categoryId: 1,
    inventoryId: 1,
    productImage:
      "https://sounnahstore.com/9575-large_default/qamis-embroidered-qabail-sham-midnight-blue.jpg",
  },
  // Add more sample products as needed
];

// CRUD

export const addProduct = async () => {
  // pass in Pg datatype
  try {
    for (let i = 0; i < product.length; i++) {
      console.log(product[i]);
      await db.insert(products).values({
        productDescription: product[i].productDescription,
        sku: product[i].sku,
        price: product[i].price,
        categoryId: product[i].categoryId,
        inventoryId: product[i].inventoryId,
        productImage: product[i].productImage,
      });
    }
  } catch (DatabaseError) {
    console.log("No product provided", DatabaseError);
  }
};

export const getProducts = async (id: number) => {
  const rowId = await db.query.products.findFirst({
    where: eq(products.product_id, id),
  });
  if (rowId == null) {
    console.log("product id does not exist");
  }

  console.log(rowId);
  return rowId;
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
