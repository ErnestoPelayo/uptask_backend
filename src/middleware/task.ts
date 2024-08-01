import { Response,Request, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global {
    namespace Express {
        interface Request {
            task : ITask
        }
    }
}

export const taskExist = async (req:Request,res:Response,next:NextFunction) =>{

    try {
        console.log(req.params)
        const {id_task} = req.params
        const task = await Task.findById(id_task)
        if(!task){
            const error = new Error('No existe la tarea desde middleware')
            return res.status(400).json({error:error.message})
        }
        req.task = task

    } catch (error) {
        return res.status(500).json({error:error.message})
    }

    next()
}

export const taskBelonToProject = async (req:Request,res:Response,next:NextFunction) => {

    try {
        const {id_task,id_Project} = req.params
        const task = await Task.findById(id_task)
        console.log(task.project)
        if(!task){
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({error:error.message})
        }    
        if(task.project.toString() !== id_Project ){
            const error = new Error('Accion no valida')
            return res.status(400).json({error : error.message})
        }
        req.task = task
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
    next()
}
