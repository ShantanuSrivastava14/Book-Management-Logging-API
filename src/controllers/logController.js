import fs from 'fs';
import path from 'path';
import { logger } from '../index.js';

const successLogPath = path.join('.', 'success.log');
const infoLogPath = path.join('.', 'info.log');
const errorLogPath = path.join('.', 'error.log');

const readLogsFromFile = (filePath) => {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return data.split('\n').filter((line) => line.trim() !== '');
    } catch (error) {
      console.error(`Error reading logs from ${filePath}: ${error.message}`);
      return [];
    }
  };

export const getLogs = async (req, res) => {
    try {
        logger.info('Trying to fetch logs', {
            source: 'getLogs',
            userId: req.user._id
        });
        const successLogs = readLogsFromFile(successLogPath);
        const infoLogs = readLogsFromFile(infoLogPath);
        const errorLogs = readLogsFromFile(errorLogPath);
        const allLogs = [...successLogs, ...infoLogs, ...errorLogs];
        logger.success('Fetched Logs', {
            source: 'getLogs',
            userId: req.user._id
        });
        res.status(200).json(allLogs);
    } catch(error){
        logger.error(error.message, {
            source: 'getLogs',
            userId: 'NA'
        });
        res.status(500).json({error: error.message || "An error occurred"});
    }
}