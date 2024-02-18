import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { User } from '../../models/user.models.js';
import jwt from 'jsonwebtoken'
export const login = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).send({
            success:false,
            message:"User not found!"
        })
    }
    const check = await bcrypt.compare(password,user.password)
    const token = jwt.sign({userId:user._id,firstname:user.firstname,lastname:user.lastname,email:user.email,bio:user.bio},process.env.JWT_SECRET);
    if(check)
    return res.status(200).send({
        success:true,
        message:"User logged in!",
        token:token
    })
    else
    return res.status(400).send({
        success:false,
        message:"logged Unsuccessfully!"
    })
});