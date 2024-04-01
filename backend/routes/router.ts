// routes

import express from "express";
import { getAllProducts } from "../controllers/products";

const router = express.Router();

router.get("/products", getAllProducts);
