import {Router} from "express";
import books from "./books";
import loans from "./loans";
import users from "./users";
import plans from "./plans";
import subscriptions from "./subscriptions";
import reviews from "./reviews";
import bookCopies from "./bookCopies";
import notifications from "./notifications";

const router = Router();

router.use("/books", books);
router.use("/loans", loans);
router.use("/users", users);
router.use("/plans", plans);
router.use("/subscriptions", subscriptions);
router.use("/reviews", reviews);
router.use("/book-copies", bookCopies);
router.use("/notifications", notifications);

export default router;