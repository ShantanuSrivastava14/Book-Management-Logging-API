import express from "express";
import * as bookController from "../controllers/bookController.js";
import { validateBook, validateParams } from "../middlewares/bookMiddleware.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser,validateBook, bookController.createBook);
router.get("/", authenticateUser, bookController.getBooks);
router.put("/:id", authenticateUser, bookController.updateBooks);
router.delete("/:id", authenticateUser, bookController.deleteBooks);

router.get("/author/:name", authenticateUser, validateParams, bookController.getBookByAuthor);
router.get("/PubYear/:year", authenticateUser,validateParams, bookController.getBookByPublicationYear);

router.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
  });

export {router as bookRoutes};