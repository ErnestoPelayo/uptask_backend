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

        try {
            return res.json(req.task)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static updateTask = async (req:Request,res:Response) => {
        
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Tarea actualizada correctamente ')
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static deleteTask = async (req:Request,res:Response) => {


        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString()!==req.task.id)
            await Promise.allSettled([Task.deleteOne(), req.project.save()])

            return res.status(200).send("Tarea eliminada ")
        } catch (error) {
            return res.status(500).json({error:error.message})
        }

    }
    
    static updateStatus = async (req:Request,res:Response) => {

        try {

            const {status} = req.body
            req.task.status = status

            await req.task.save()

            return res.status(200).send("Estado actualizado ")
        } catch (error) {
            return res.status(500).json({error:error.message})
        }

    }
    
    
}
