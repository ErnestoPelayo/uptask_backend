import type { Request,Response } from "express"
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
            res.status(200).json(projects)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
   

}