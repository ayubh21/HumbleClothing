import express, { Express } from "express";
import { createProduct, getAllProducts } from "../controllers/products";
import dotenv from "dotenv";
import { check } from "express-validator";
const app: Express = express();
dotenv.config();

const port = process.env.PORT;
app.use(express.json());
app.get("/products", getAllProducts);
app.post(
  "/products",
  [
    check("productDescription")
      .isLength({ min: 20 })
      .withMessage("description must be at least 20 chars long"),
    check("sku")
      .isLength({ min: 20 })
      .withMessage("sku must be atleast 20 chars long"),
    check("price").custom((value: number) => {
      if (value > 0) {
        throw new Error("price cannot be negative");
      }
    }),
  ],

  createProduct,
);

app.listen(port, () => console.log(`server is listening on ${port}`));
