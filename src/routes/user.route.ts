import { Router } from "express";
import { getAllUsers, getUserById } from "../services/user.service";

export const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
