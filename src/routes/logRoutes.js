import express from "express";
import * as logController from "../controllers/logController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get('/fetch', authenticateUser, logController.getLogs);

router.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
  });

export {router as logRoutes};