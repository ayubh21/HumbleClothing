// Products
// import { Error } from "postgres";
import { db } from "../db/database";
import { products } from "../db/schema";
import { Product } from "../models/models";
import { eq, sql } from "drizzle-orm";
// import { DatabaseError } from "pg";
// import { real } from "drizzle-orm/mysql-core/index";

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
    inventoryId: 2,
    productImage:
      "https://sounnahstore.com/10236-large_default/qamis-qabail-qc-subtil-.jpg",
  },
  {
    productDescription: "QAMIS EMBROIDERED QABAIL SHAM TAUPE",
    sku: "DN-015",
    price: "48.33",
    categoryId: 1,
    inventoryId: 3,
    productImage:
      "https://sounnahstore.com/9588-large_default/qamis-embroidered-qabail-sham-taupe.jpg",
  },
  {
    productDescription: "QAMIS EMBROIDERED QABAIL SHAM MIDNIGHT BLUE",
    sku: "DN-016",
    price: "49.99",
    categoryId: 1,
    inventoryId: 4,
    productImage:
      "https://sounnahstore.com/9575-large_default/qamis-embroidered-qabail-sham-midnight-blue.jpg",
  },
  // Add more sample products as needed
];

// CRUD

const addProduct = async () => {
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
    // check to see if row has been added if it hasnt then throw error
    console.log("No product provided", DatabaseError);
  }
};

const getProducts = async (id: number) => {
  const rowId = await db.query.products.findFirst({
    where: eq(products.product_id, id),
  });
  if (rowId == null) {
    console.log("product id does not exist");
  }

  console.log(rowId);
  return rowId;
};

getProducts(2);
