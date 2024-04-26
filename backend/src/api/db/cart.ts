// cart
import { db } from "./database";
import { cart, products } from "./schema";
import { eq } from "drizzle-orm";
import { Cart, Product } from "../models/models";
import { getProducts } from "./products";
export const buildCart = async () => {
  try {
    // const bin: (typeof temp)[] = [];
    const tempCart = await db
      .select({
        cartId: cart.cartId,
        quantity: cart.quantity,
        sessionId: cart.sessionId,
        products: {
          productId: products.product_id,
          productDescription: products.productDescription,
          price: products.price,
          productImage: products.productImage,
          sku: products.sku,
        },
      })
      .from(cart)
      .innerJoin(products, eq(products.product_id, cart.productId));
    console.log(tempCart);
    return tempCart;
  } catch (err) {
    console.log(err);
  }
};

// adding to cart and inserting into the database.
export const InsertCart = async (temp: Cart) => {
  try {
    const prodObj = await getProducts();

    const cartObj = await db
      .insert(cart)
      .values({
        cartId: temp.cartId,
        quantity: temp.quantity,
        sessionId: temp.sessionId,
        productId: temp.productId,
        product: [
          {
            productId: prodObj.product_id,
            productDescription: prodObj.productDescription,
            price: products.price,
            productImage: products.productImage,
            sku: products.sku,
          },
        ],
      })
      .returning();
  } catch (err) {
    console.log(err);
  }
};
