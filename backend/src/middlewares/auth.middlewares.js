import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
export const authMiddleware = asyncHandler(async (req, res, next) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  if(!token)
  {
    return res.status(400).send({
        success : false,
        message : "you are not logged in!"
      });
}
  jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (!err) {
        const userId = decoded.userId;
        console.log("userid : ", userId);
        (async () => {
          const user = await User.findOne({ _id: userId });
          if (user) next();
          else return res.status(400).send({
            success : false,
            message : "you are not logged in!"
          });
        })();
      } else console.log(err);
    }
  );
});
