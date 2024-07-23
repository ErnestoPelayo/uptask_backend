import express from "express"
import dotenv from 'dotenv'
import { connectDb } from "./config/db"

dotenv.config()

connectDb()

const app = express()


export default app