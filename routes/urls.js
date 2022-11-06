import { Router } from "express";
import { shortenUrl, redirectURL } from "../controllers/urls.js";
const router = Router();
router.route("/api").post(shortenUrl);
router.route("/:urlId").get(redirectURL);

export { router as urlRouter };
