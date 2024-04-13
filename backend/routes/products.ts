// routes

import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getOneProduct,
} from "../controllers/products";
import { check } from "express-validator";

const router = express.Router();

// product routes
router.post(
  "/",
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

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

// category routes

export default router;
