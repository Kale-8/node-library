import {Router} from "express";
import {bookCopyController} from "../controllers/bookCopyController";

const router = Router();

router.get("/", bookCopyController.list);
router.get("/:id", bookCopyController.get);
router.post("/", bookCopyController.create);
router.put("/:id", bookCopyController.update);
router.delete("/:id", bookCopyController.remove);

export default router;