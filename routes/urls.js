import { Router } from "express";
import { shortenUrl } from "../controllers/urls.js";
const router = Router();
router.route("/").post(shortenUrl);

export { router as urlRouter };
