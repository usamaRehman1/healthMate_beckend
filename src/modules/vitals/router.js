import { Router } from "express";
import { protect } from "../../middlewear/authMiddlewear.js";
import getController from "./controller/get.js";
import postController from "./controller/post.js";
import updateController from "./controller/update.js";
import deleteController from "./controller/delete.js";

const router = Router();

router.get("/", protect, getController);
router.post("/",protect, postController)
router.put("/:id", protect, updateController);
router.delete("/:id",protect, deleteController)


export default router