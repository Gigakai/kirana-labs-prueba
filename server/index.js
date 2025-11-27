import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/database.js';
import ContactModel from "./models/ContactModel.js";
import ContactRouter from "./routes/ContactRouter.js";
import cors from 'cors'


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/contact', ContactRouter);

await connectDB();

await ContactModel.sync();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

