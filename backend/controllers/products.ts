// Products
import { Error } from "postgres";
import { db } from "../db/database.ts";
import { products } from "../db/schema";
import { Product, Products } from "../models/models.ts";
import { sql } from 'drizzle-orm'
import { DatabaseError } from "pg";
import { real } from "drizzle-orm/mysql-core/index";


export const product = [
  {
    productDescription: "Qamis Qabail Qc Subtile white",
    sku: "QAMIS-WHITE",
    price: 49.99,
    categoryId: 1,
    inventoryId: 1,
    productImage:
      "https://sounnahstore.com/10241-large_default/qamis-qabail-qc-subtil-.jpg",
  },
  {
    productDescription: "Qamis Qabail Qc Subtile Black and Purple",
    sku: "QAMIS-BLACK-PURPLE",
    price: 49.99,
    categoryId: 1,
    inventoryId: 2,
    productImage:
      "https://sounnahstore.com/10236-large_default/qamis-qabail-qc-subtil-.jpg",
  },
  {
    productDescription: "QAMIS EMBROIDERED QABAIL SHAM TAUPE",
    sku: "DN-015",
    price: 29.99,
    categoryId: 1,
    inventoryId: 3,
    productImage:
      "https://sounnahstore.com/9588-large_default/qamis-embroidered-qabail-sham-taupe.jpg",
  },
  {
    productDescription: "QAMIS EMBROIDERED QABAIL SHAM MIDNIGHT BLUE",
    sku: "DN-016",
    price: 39.99,
    categoryId: 1,
    inventoryId: 4,
    productImage:
      "https://sounnahstore.com/9575-large_default/qamis-embroidered-qabail-sham-midnight-blue.jpg",
  },
  // Add more sample products as needed
];

// CRUD
const addProduct(id: serial): Product {
  try {

    for (let i = 0; i < product.length; i++) {
      await db.insert(products).values({ productDescription: product[i].productDescription, sku: product[i].sku, price: product[i].price, categoryId: product[i].categoryId, inventoryId: product[i].inventoryId, productImage: product[i].productImage }
      ).then(`where`)
    })
  }

  }.catch ((err) => {
  if (err instanceof DatabaseError) {
    console.log(err.message)
  }
}
}





