import express from "express";
import { router as healthRouter } from "./routes/health.route";
import { router as userRouter } from "./routes/user.route";

const app = express();
const PORT = process.env["PORT"] || 3000;

app.use(express.json());
app.use("/health", healthRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
