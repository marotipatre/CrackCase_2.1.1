import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectDb from './src/db/connectDB.js'
import {UserRouter} from './src/routes/user.routes.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/v1/user", UserRouter);
try {
    ConnectDb().then(()=>{
        app.listen(5000,()=>{
            console.log("app is listening on port 5000")
        })
    }).catch((err)=>{
        console.log(err)
    })
} catch (error) {
    console.log("something went wrong! in index.js")
}

