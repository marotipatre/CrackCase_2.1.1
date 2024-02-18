import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    skills: [
      {
        type: String,
      },
    ],
    intrests: [
      {
        type: String,
      },
    ],
    pastExperience: [
      {
        role: {
          type: String,
          default:""
        },
        department: {
          type: String,
          default:""
        },
        to: {
          type: String,
          default:""
        },
        from: {
          type: String,
          default:""
        },
        companyName: {
          type: String,
          default:""
        },
        additionalDetails: {
          type: String,
          default:""
        },
      },
    ],
  },
  { timestamps: true }
);
export const UserProfile = mongoose.model("UserProfile",profileSchema)