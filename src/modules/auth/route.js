import { Router } from "express";
import signUpController from "./controller/signup.js";
import logInController from "./controller/login.js"
import { protect } from "../../middlewear/authMiddlewear.js";
import getController from "./controller/get.js";

const router = Router();

router.get("/", protect, getController)
router.post("/signup", signUpController)
router.post("/login", logInController)

export default router