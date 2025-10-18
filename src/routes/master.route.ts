import { Router } from "express";
import { masterDataController } from "../controller/master.controller";

const router = Router();

// POST is safer for arrays; you can also add a GET version if you want
router.post("/master", masterDataController);

export default router;
