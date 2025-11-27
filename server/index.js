import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/database.js';
import ContactModel from "./models/ContactModel.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

await connectDB();

await ContactModel.sync();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

