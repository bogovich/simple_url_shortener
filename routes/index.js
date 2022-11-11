import { Router } from "express";
import ejs from "ejs";
const router = Router();

router.get("/", function (req, res, next) {
  res.render("index");
});

export { router as indexRouter };
