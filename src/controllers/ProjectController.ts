import { type Request,type Response } from "express"
import Project from "../models/Project"

export class ProjectController {
    
   
    static createProject = async (req:Request,res:Response) => {

        const project = new Project(req.body)

        try {
            await project.save()
            res.send("Proyecto Creado correctamente")

        } catch (error) {
            res.send(error.message)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find()
            return res.status(200).json(projects)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }


    static getProjectById = async (req:Request,res:Response) => {
        try {
            const {id} = req.params
            const project = await Project.findById(id).populate('tasks')
            if(!project){
                const error = new Error('Proyecto No encontrado')
                return res.status(404).json({error:error.message})
            }
            return res.json(project)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

    static updateProject = async(req:Request,res:Response) => {

        const {id} = req.params
         
        try {
            const project = await Project.findByIdAndUpdate(id,req.body)
            await project.save()
            res.send("Proyecto actualizado")

        } catch (error) {
            return res.status(500).send(error.message)

        }
    }
   
    static deleteProject = async(req:Request,res:Response) => {

        const {id} = req.params
         
        try {
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Proyecto No encontrado')
                return res.status(404).json({error:error.message})
            }
            await project.deleteOne()
            res.send("Proyecto Eliminado")

        } catch (error) {
            return res.status(500).send(error.message)

        }
    }

}