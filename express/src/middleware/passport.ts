/* eslint-disable @typescript-eslint/no-explicit-any */
import passport, { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import User, { IUser as UserType } from "../models/User";

type VerifyFunction = (
  username: string,
  password: string,
  done: (err: Error | null, user?: UserType | false) => void
) => void;

const verify: VerifyFunction = (username, password, done) => {
  User.findOne({ name: username })
    .then((user: UserType | null) => {
      if (!user) {
        return done(null, false);
      }

      if (!User.validate(password, user.password)) {
        return done(null, false);
      }

      return done(null, user);
    })
    .catch((err) => {
      done(err);
    });
};

const options = {
  usernameField: "name",
  passwordField: "password",
};

passport.use("local", new Strategy(options, verify));

passport.serializeUser((user: any, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findById(id)
    .then((user: UserType | null) => cb(null, user))
    .catch((err) => {
      cb(err);
    });
});

export default passport as PassportStatic;
