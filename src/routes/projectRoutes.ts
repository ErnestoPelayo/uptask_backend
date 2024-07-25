import { Router } from "express"
import { body } from "express-validator"

import { ProjectController } from "../controllers/ProjectController"
import {handleInputErrors} from '../middleware/validation'
const router = Router()

router.post('/',
    body('projectName').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('clientName').notEmpty().withMessage("El cliente del proyecto es obligatorio"),
    body('description').notEmpty().withMessage("La descripcion del proyecto es obligatorio"),
    handleInputErrors,
    ProjectController.createProject
)
router.get('/',ProjectController.getAllProjects)

export default router