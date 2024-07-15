import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import db from './db.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', authRoutes)

const PORT = process.env.PORT

app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})