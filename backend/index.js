import cookieParser from 'cookie-parser';
import "dotenv/config"
import express from 'express';
import cors from 'cors';
import userRoutes from "./src/route/user.route.js"
import companyRoutes from "./src/route/company.route.js"
import jobRoutes from "./src/route/job.route.js"
import applicationRoutes from "./src/route/application.route.js"
import { connectToDatabase } from './src/db/index.js';
const app = express();

const PORT=process.env.PORT || 3000


// middleware 
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

// DATABASE 
connectToDatabase()

// routes

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/company",companyRoutes)
app.use("/api/v1/job",jobRoutes)
app.use("/api/v1/application",applicationRoutes)

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)

})


