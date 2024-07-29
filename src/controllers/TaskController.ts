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

    static getAllTask = async (req:Request,res:Response) => {
        try {
            const tasks = await Task.find()
            return res.status(200).json(tasks)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }
}
