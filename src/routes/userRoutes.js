import express from "express";
import * as userController from "../controllers/userController.js";
import {validateUser} from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/signup", validateUser, userController.signup);
router.post("/login", userController.login);

router.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
  });

export {router as userRoutes};