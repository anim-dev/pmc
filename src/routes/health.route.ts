import { Router } from "express";

export const router = Router();

router.get("/", (_, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
