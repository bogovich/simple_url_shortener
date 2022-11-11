import { Router } from "express";
import { signUp } from "../controllers/users.js";
const router = Router();

router.route("/auth").post(signUp);

export { router as authRouter };
