import { Router } from "express";
import { getLocation } from "../controller/location.controller";

const router = Router();

router.get("/location", getLocation);

export default router;
