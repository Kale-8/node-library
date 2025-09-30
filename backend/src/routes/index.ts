import { Router } from "express";
import books from "./books";
import loans from "./loans";
const router = Router();
router.use("/books", books);
router.use("/loans", loans);
export default router;
