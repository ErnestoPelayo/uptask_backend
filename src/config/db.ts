import mongoose from "mongoose"
import colors from 'colors'

export const connectDb = async ()=> {

    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.cyan.bold(`MongoDb conectado en ${url}`))
    } catch (error) {
        console.log(colors.bgRed(error.message))
        process.exit(1)
    }
}