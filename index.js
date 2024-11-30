import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./database/connection.js";
import courseRouter from "./src/modules/courses/course.router.js";
import studentsRouter from "./src/modules/students/students.router.js";
import qrRouter from "./src/modules/QRcode/qr.router.js";
config();
connectDB();
const app = express();
app.use(cors());
app.use(json());
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/qr", qrRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
