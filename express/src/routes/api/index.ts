import { Router } from "express";
import userRouter from "./userRouter";
import booksRouter from "./booksRouter";
const router = Router();

router.use("/user", userRouter);
router.use("/book", booksRouter);

export default router;
