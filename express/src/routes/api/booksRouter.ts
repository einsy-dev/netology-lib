import bookController from "../../controllers/bookController";
import multer from "multer";
import { Router } from "express";

const bookRouter = Router();

bookRouter.get("/", bookController.getAll);
bookRouter.get("/:id", bookController.getById);
bookRouter.post(
  "/",
  multer().fields([{ name: "fileBook" }, { name: "fileCover" }]),
  bookController.create
);
bookRouter.post(
  "/:id",
  multer().fields([{ name: "fileBook" }, { name: "fileCover" }]),
  bookController.update
);
bookRouter.delete("/:id", bookController.delete);

export default bookRouter;
