import {Router} from "express";
import {notificationController} from "../controllers/notificationController";

const router = Router();

router.get("/user/:userId", notificationController.listByUser);
router.post("/", notificationController.create);
router.post("/:id/read", notificationController.markRead);
router.delete("/:id", notificationController.remove);

export default router;