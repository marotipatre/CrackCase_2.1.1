import asyncHandler from 'express-async-handler'
import { User } from '../../models/user.models.js';
import jwt from 'jsonwebtoken'
export const getUser = asyncHandler(async (req, res) => {
    return res.status(200).send({
        success:false,
        message:"logged!"
    })
});