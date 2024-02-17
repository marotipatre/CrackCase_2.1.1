import express from 'express'
import dotenv from 'dotenv'
import ConnectDb from './src/db/connectDB.js'
dotenv.config()
const app = express()
app.use(express.json())
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

