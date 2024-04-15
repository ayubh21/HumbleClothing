import express from "express";
import { isAuthenticated } from "../middleware/middleware";
import {
  handleGetAllUser,
  handleDeleteUser,
  handleGetUserbyId,
  handleAddUser,
  handleUpdateUser,
  handleGetUserbyEmail,
} from "../controllers/user";

const router = express.Router();

router.get("/", isAuthenticated, handleGetAllUser);
router.get("/:id", handleGetUserbyId);
router.get("/:email", handleGetUserbyEmail);
router.put("/:id", handleUpdateUser);
router.delete("/:id", handleDeleteUser);
router.post("/", handleAddUser);

export default router;
