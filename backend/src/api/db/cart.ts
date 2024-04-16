// cart
import { db } from "./database";
import { cart, products } from "./schema";
import { Cart } from "../models/models";

export const buildCart = async (basket: Cart) => {
  try {
    const tempCart = await db.select(cart).values({
      cartId: basket.cartId,
      productId: basket.productId,
      quantity: basket.quantity,
      sessionId: basket.sessionId,
    });

    return tempCart;
  } catch (err) {
    console.log(err);
  }
};
