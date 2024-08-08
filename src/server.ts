import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from "./config/db"
import {corsConfig} from './config/cors'
import projectRoutes from './routes/projectRoutes'

dotenv.config()

connectDb()

const app = express()
app.use(cors('http://localhost:5173/'))
app.use(express.json())

app.use('/api/projects',projectRoutes)

export default app