import appController from "../../controllers/appController";
import { Router } from "express";

const router = Router();

router.get("/:type?/:id?", appController.main);

export default router;
