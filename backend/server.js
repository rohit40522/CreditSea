import express from 'express';
import cors from 'cors';
import creditRouter from './routes/creditRoutes.js';  // Fix: changed from '../routes/creditRoutes.js'
import connectDB from './config/database.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();
// Routes
app.use('/api', creditRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));