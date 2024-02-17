import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { User } from '../../models/user.models.js';
export const signUp = asyncHandler(async (req, res) => {
    const {firstname,lastname,email,password,bio} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.findOne({email})
    if(user)
    return res.status(400).send({
        success:false,
        message:"User already exists!"
    })
    await User.create({firstname,lastname,email,password:hashPassword,bio}).then(()=>{
        console.log("user created successfully!")
        return res.status(200).send({
            message: "User created successfully",
            data:{firstname,lastname,email,password,bio}
          });
    }).catch((err)=>{
        console.log("error occured!",err)
        res.status(400).send(err.message);
    })
});