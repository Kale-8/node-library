import {Router} from "express";
import {subscriptionController} from "../controllers/subscriptionController";

const router = Router();

router.get("/", subscriptionController.list);
router.get("/:id", subscriptionController.get);
router.post("/", subscriptionController.create);
router.get("/user/:userId", subscriptionController.getByUser);
router.post("/:id/cancel", subscriptionController.cancel);
router.delete("/:id", subscriptionController.remove);

export default router;