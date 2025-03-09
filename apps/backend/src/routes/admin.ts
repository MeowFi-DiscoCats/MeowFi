import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../setup/passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { username } = req.user as { username: string };
    const token = jwt.sign({ username }, process.env.ADMIN_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ token });
  },
);

export default router;
