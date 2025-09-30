import { Router } from "express";
import { loanController } from "../controllers/loanController";
import { validateDueDate } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/auth";
const router = Router();
router.get("/", loanController.list);
router.post("/", authMiddleware, validateDueDate, loanController.create);
export default router;
