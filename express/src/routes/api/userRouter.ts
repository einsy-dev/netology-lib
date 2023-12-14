const userRouter = require("express").Router();
import multer from "multer";
import userController from "../../controllers/userController";
import passport from "../../middleware/passport";

userRouter.post("/register", multer().none(), userController.register);
userRouter.post(
  "/login",
  multer().none(),
  passport.authenticate("local", { failureRedirect: "/app/login" }),
  userController.login
);
userRouter.get("/profile", userController.profile);

export default userRouter;
