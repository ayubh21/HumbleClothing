import express from "express";
import { register } from "../controllers/auth";

const router = express.Router();

router.post("/", register);
router.get("/", (req, res) => {
  res.send("hello world");
});
export default router;
