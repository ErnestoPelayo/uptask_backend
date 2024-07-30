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
        const task = await Task.findById(id_task)
        
        if(!task){
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({error:error.message})
        }    
        if(task.project.toString() !== req.project.id ){
            const error = new Error('Accion no valida')
            return res.status(400).json({error : error.message})
        }
        
        task.name = req.body.name
        task.description = req.body.description
        await task.save()
        res.send('Tarea actualizada correctamente ')
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static deleteTask = async (req:Request,res:Response) => {

        const {id_task} = req.params

        try {

            const task = await Task.findById(id_task)

            if(!task){
                const error = new Error('No existe la tarea')
                return res.status(400).json({error:error.message})
            }

            if(task.project.toString() !== req.project.id){
                const error = new Error('Accion no valida')
                return res.status(400).json({error:error.message})
            }
            req.project.tasks = req.project.tasks.filter(task => task.toString()!==id_task)
            await Promise.allSettled([Task.deleteOne(), req.project.save()])

            return res.status(200).send("Tarea eliminada ")
        } catch (error) {
            return res.status(500).json({error:error.message})
        }

    }
    
    static updateStatus = async (req:Request,res:Response) => {

        const {id_task} = req.params

        try {

            const task = await Task.findById(id_task)

            if(!task){
                const error = new Error('No existe la tarea')
                return res.status(400).json({error:error.message})
            }

            const {status} = req.body
            task.status = status
            await task.save()

            return res.status(200).send("Estado actualizado ")
        } catch (error) {
            return res.status(500).json({error:error.message})
        }

    }
    
    
}
