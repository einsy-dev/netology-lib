import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

const User = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default model("User", User);
