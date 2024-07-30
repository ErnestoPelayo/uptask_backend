import { json, type Request,type Response } from "express"
import Task from "../models/Task"

export class TaskController {
       
    static createTask = async (req:Request,res:Response) => {     
        try {           
            const newTask = new Task(
                {   
                    ...req.body,
                    project:req.project.id
                }
            )      
            req.project.tasks.push(newTask.id)
            await Promise.allSettled([newTask.save(),req.project.save()])
            return res.status(200).json("Tarea creada Correctamente")
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static getTasksByIdProject = async (req:Request,res:Response) => {
        
        try {
            const tasks = await Task.find({project:req.project.id}).populate('project')
            return res.json(tasks)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static getTaskById = async (req:Request,res:Response) => {
        
        let {id_task} = req.params

        try {
            const task = await Task.findById(id_task)
            if(!task){
                const error = new Error("Tarea no encontrada")
                return res.status(404).json({error:error.message})
            }
            if(task.project.toString() !== req.project.id){
                const error = new Error("Accion no valida")
                return res.status(400).json({error:error.message})
            }
            return res.json(task)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static updateTask = async (req:Request,res:Response) => {
        
        try {
        const {id_task} = req.params
        const task = await Task.findByIdAndUpdate(id_task,req.body)
        
        if(!task){
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({error:error.message})
        }    
        if(task.project.toString() !== req.project.id ){
            const error = new Error('Accion no valida')
            return res.status(400).json({error : error.message})
        }
        res.send('Tarea actualizada correctamente ')
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static getAllTask = async (req:Request,res:Response) => {
        try {
            const tasks = await Task.find()
            return res.status(200).json(tasks)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }
}
