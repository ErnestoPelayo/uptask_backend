import { Request,Response,NextFunction } from "express"
import Project, { IProyect } from "../models/Project"

declare global {
    namespace Express {
        interface Request {
            project: IProyect
        }
    }
}

export async function validationProject(req:Request,res:Response, next:NextFunction) {

   try {
    const {id_Project} = req.params    
    const project = await Project.findById(id_Project)
        
    if(!project){
        const error = new Error('Proyecto No encontrado')
        return res.status(404).json({error:error.message})
    }
    req.project = project
    next()
   } catch (error) {
    return res.status(500).json({error:error.message})
   }
    
}