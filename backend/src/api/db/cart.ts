// cart
import { db } from "./database";
import { cart, products } from "./schema";
import { Cart } from "../models/models";
import { eq } from "drizzle-orm";
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
    return tempCart;
  } catch (err) {
    console.log(err);
  }
};

buildCart();

// export const addToCart = async () => {
//   try {
//
//
//   } catch (err) {
//     console.log(err);
//   }
// };
