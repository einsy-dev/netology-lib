import User from "../models/User";
import { Request, Response } from "express";
class UserController {
  async login(req: Request, res: Response) {
    try {
      res.redirect("/app");
    } catch (error) {
      console.log("err" + error);
    }
  }
  async register(req: Request, res: Response) {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).send({ message: "Please fill in all fields" });
    }
    try {
      const candidate = await User.findOne({ name });
      if (candidate) {
        return res.status(400).send({ message: "User already exists" });
      }
      await User.create({ name, email: "test@mail.ru", password });
      res.redirect("/app");
    } catch (error) {
      console.log("err" + error);
    }
  }
  async profile(req: Request, res: Response) {
    try {
      if (!req.isAuthenticated()) {
        return res.redirect("/app/login");
      }
      res.status(200).send(req.user);
    } catch (error) {
      console.log("err" + error);
    }
  }
}

export default new UserController();
