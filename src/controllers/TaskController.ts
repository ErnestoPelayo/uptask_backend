import { json, type Request,type Response } from "express"
import Task from "../models/Task"

export class TaskController {
       
    static createTask = async (req:Request,res:Response) => {

        const {id_Project} = req.params

        try {
            const newTask = new Task(
                {   
                    ...req.body,
                    project:id_Project
                }
            )
            newTask.save()

            return res.status(200).json("Tarea creada Correctamente")
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
