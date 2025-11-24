import {Router} from "express";
import {planController} from "../controllers/planController";

const router = Router();

router.get("/", planController.list);
router.get("/:id", planController.get);
router.post("/", planController.create);
router.put("/:id", planController.update);
router.delete("/:id", planController.remove);

export default router;
