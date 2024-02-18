import mongoose from "mongoose";
const startupProfileSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    descriptions:{
        type:String
    },
    mission:{
        type:String
    },
    offerings:{

    },
    teamMembers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    investors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    partners:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    pitchDecks:[{
        type:String
    }]
},{timestamps:true})
export const StartupProfile = mongoose.model("StartupProfile",startupProfileSchema);