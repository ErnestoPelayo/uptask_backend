import { Router } from "express"
import { body, param } from "express-validator"

import { ProjectController } from "../controllers/ProjectController"
import {handleInputErrors} from '../middleware/validation'
import { TaskController } from "../controllers/TaskController"
import { validationProject } from "../middleware/project"
const router = Router()

router.post('/',
    body('projectName').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
    body('clientName').notEmpty().withMessage("El cliente del proyecto es obligatorio"),
    body('description').notEmpty().withMessage("La descripcion del proyecto es obligatorio"),
    handleInputErrors,
    ProjectController.createProject
)
router.get('/',ProjectController.getAllProjects)
router.get('/:id',
        param('id').isMongoId().withMessage('Id invalido'),
        handleInputErrors,
        ProjectController.getProjectById)
router.put('/:id',
        param('id').isMongoId().withMessage('Id invalido'),
        body('projectName').notEmpty().withMessage("El nombre del proyecto es obligatorio"),
        body('clientName').notEmpty().withMessage("El cliente del proyecto es obligatorio"),
        body('description').notEmpty().withMessage("La descripcion del proyecto es obligatorio"),
        handleInputErrors,
        ProjectController.updateProject)

router.delete('/:id',
        param('id').isMongoId().withMessage('Id invalido'),
        handleInputErrors,
        ProjectController.deleteProject)



/* Tasks */      
router.param('id_Project',validationProject)   
router.post('/:id_Project/task',
        param('id_Project').isMongoId().withMessage('Id Invalido'),
        body('name').notEmpty().withMessage("El Nombre de la tarea"),
        body('description').notEmpty().withMessage("La descripcion de la tarea es obligatorio"),    
        TaskController.createTask
)

router.get('/:id_Project/task/:id_task',
        param('id_task').isMongoId().withMessage('Id Invalido'),
        TaskController.getTaskById
)

router.put('/:id_Project/task/:id_task',
        param('id_task').isMongoId().withMessage('Id Invalido'),
        TaskController.updateTask
)

export default router