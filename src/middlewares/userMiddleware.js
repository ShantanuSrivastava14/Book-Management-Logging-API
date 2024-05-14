import { check } from "express-validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const validateUser = [
    check("email").isEmail().withMessage("Invalid email address"),
    check("password")
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),
];

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if(!token){
            throw new Error("Please authenticate.");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
            ignoreExpiration: false,
        });
        const user =  await userModel.findOne({
            _id: decoded.id,
        });
        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch(error){
        res.status(401).send({error: "Please authenticate."});
    }
};
    
