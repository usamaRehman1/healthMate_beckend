import { Router } from "express";
import { upload } from "../../middlewear/uploadMiddlewear.js";
import { protect } from "../../middlewear/authMiddlewear.js";
import postController from "../files/controller/post.js"
import getController from "../files/controller/get.js"
import deleteController from "./controller/delete.js";

const router = Router();
router.post("/", protect, upload.single('health_mate_reports'), postController)
router.get("/", protect, getController)
router.delete("/:id", protect, deleteController)

export default router