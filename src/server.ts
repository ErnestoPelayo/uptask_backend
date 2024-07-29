import express from "express"
import dotenv from 'dotenv'
import { connectDb } from "./config/db"
import projectRoutes from './routes/projectRoutes'
import taskRoutes from './routes/taskRoutes'

dotenv.config()

connectDb()

const app = express()

app.use(express.json())

app.use('/api/projects',projectRoutes)
app.use('/api/task',taskRoutes)

export default app