import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import winston from "winston";
import { userRoutes } from "./routes/userRoutes.js";
import { bookRoutes } from "./routes/bookRoutes.js";
import { logRoutes } from "./routes/logRoutes.js";


dotenv.config();
const app = express();
app.use(express.json());

app.all("/", (req, res) => {
  res.json({ message: "Hello From Book Management API" });
});

app.use((req, res, next) => {
  if (req.path.startsWith("/user") || req.path.startsWith("/books") || req.path.startsWith("/logs")) {
    next();
  } else {
    res.status(404).json({ error: "Route not found" });
  }
});

const logFormat = winston.format.printf(({ level, message, source, timestamp, userId }) => {
  return `${timestamp} [${source}] ${level} ${message} ${userId}`;
});

// Define custom log levels and their colors
const customLevels = {
  levels: {
    error: 0,
    info: 1,
    success: 2
  },
  colors: {
    error: 'red',
    info: 'green',
    success: 'blue'
  }
};

// Add colors to the logger
winston.addColors(customLevels.colors);

// Create separate transports for each log level
const errorTransport = new winston.transports.File({ filename: 'error.log', level: 'error' });
const infoTransport = new winston.transports.File({ filename: 'info.log', level: 'info' });
const successTransport = new winston.transports.File({ filename: 'success.log', level: 'success' });

// Create separate loggers for each log level
const errorLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [errorTransport]
});

const infoLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [infoTransport]
});

const successLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [successTransport]
});

// Use the appropriate logger based on the log level
export const logger = {
  error: errorLogger.error.bind(errorLogger),
  info: infoLogger.info.bind(infoLogger),
  success: successLogger.success.bind(successLogger)
};

app.use("/user", userRoutes);
app.use("/books", bookRoutes);
app.use("/logs", logRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT} 🚀🚀`);
    });
  })
  .catch((err) => console.error(err));
