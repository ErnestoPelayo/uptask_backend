import mongoose,{Schema,Document} from "mongoose";

export type ProyectType = Document & {
    projectName:string
    clientName:string
    decription:string 
}

const ProjectSchema : Schema = new Schema({
    projectName :{
        type:String,
        trim : true,
        required : true
    },
    clientName : {
        type: String,
        trim: true,
        required : true
    },
    decription : {
        type:String,
        trim:true,
        required:true
    }
})

const Project = mongoose.model<ProyectType>("Project", ProjectSchema)

export default Project

