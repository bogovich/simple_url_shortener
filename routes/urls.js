import { Router } from "express";
import {
  shortenURL,
  redirectURL,
  deleteURL,
  getUserURLS,
} from "../controllers/urls.js";
const router = Router();
router.route("/api").post(shortenURL).delete(deleteURL);
router.route("/go/:urlId").get(redirectURL);
router.route("/api/user").get(getUserURLS);

export { router as urlRouter };
