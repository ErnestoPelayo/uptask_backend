import { Router } from "express"
import { body, param } from "express-validator"
import { TaskController } from "../controllers/TaskController"

const router = Router()

router.get('/',TaskController.getAllTask)

export default router