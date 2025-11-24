import {Router} from "express";
import {reviewController} from "../controllers/reviewController";

const router = Router();

router.get("/", reviewController.list);
router.get("/book/:bookId", reviewController.listByBook);
router.post("/", reviewController.create);
router.delete("/:id", reviewController.remove);

export default router;