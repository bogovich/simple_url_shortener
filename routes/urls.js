import { Router } from "express";
import { shortenURL, redirectURL, deleteURL } from "../controllers/urls.js";
const router = Router();
router.route("/api").post(shortenURL).delete(deleteURL);
router.route("/:urlId").get(redirectURL);

export { router as urlRouter };
