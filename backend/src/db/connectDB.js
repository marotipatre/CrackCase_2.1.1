import mongoose from "mongoose";
export default async function ConnectDb(){
    try {
    const dbInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connection successfull!");
    } catch (error) {
        console.log("error occured in connection of database!")
    }
}