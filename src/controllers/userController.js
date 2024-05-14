import { validationResult } from "express-validator";
import userModel from "../models/userModel.js";
import { createSecretToken } from "../utils/secretToken.js";
import { logger } from "../index.js";

export const signup = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      logger.info('Signing In', {
        source: 'signup',
        userId: 'NA'
      });
      if (!errors.isEmpty()) {
        logger.info('Entered details are not correct', {
          source: 'signup',
          userId: 'NA'
        });
        return res.status(400).json({ error: "Please enter correct Details!" });
      }
      const { email, password } = req.body;
      const exisitigUser = await userModel.findOne({email: email});
      if(exisitigUser){
        logger.info(`Existing user (${email}) trying to signup`, {
          source: 'signup',
          userId: exisitigUser._id
        });
        return res.status(200).json({ message: "User already signed up successfully. Please Login!!" });
      }
      const user = new userModel({ email, password });
      await user.save();
      logger.success(`User signed up successfully ${user}`, {
        source: 'signup',
        userId: user._id
      })
      res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
      logger.error(error.message, {source: 'signup', userId: 'NA'});
      res.status(500).json({ error: error.message || "An error occurred" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        logger.info(`${email} trying to login`, {
          source: 'login',
          userId: 'NA'
        });
        if(!user){
            logger.info(`${email} trying to login`, {
              source: 'login',
              userId: 'NA'
            });
            return res.status(400).json({error: "Incorrect Email"});
        }
        if(!(await user.comparePassword(password))){
          logger.info('Incorrect Password', {
            source: 'login',
            userId: user._id
          });
          return res.status(400).json({error: "Incorrect Password"});
        }
        const token = createSecretToken(user._id);
        logger.success('User loggedIn', {
          source: 'login',
          userId: user._id
        })
        return res.status(200).json({email: user.email, token});
    } catch(error){
        logger.error(error.message, {source: 'login', userId: 'NA'});
        res.status(500).json({error: error.message || "An error occurred"});
    }
};