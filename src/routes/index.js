import { Router } from "express";
import authRouter from "../modules/auth/route.js";
import fileRouter from "../modules/files/router.js";
import vitalRouter from "../modules/vitals/router.js"

const router = Router()
router.use('/auth', authRouter)
router.use('/file', fileRouter)
router.use('/vital', vitalRouter)

export default router