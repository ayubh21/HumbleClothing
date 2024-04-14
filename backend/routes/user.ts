import express from "express";
import { addUser, getAllUser } from "../controllers/user";

const router = express.Router();

router.get("/", getAllUser);
// router.get("/", getUserbyId);
// router.get("/", getUserbyEmail);
// router.get("/", getUserByToken);
router.post("/", addUser);

export default router;
