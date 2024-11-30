import { toDataURL } from "qrcode";
import AttendanceModel from "../../../database/model/attendence.model.js";
import CourseModel from "../../../database/model/course.model.js";
import StudentModel from '../../../database/model/student.model.js';
import jwt from "jsonwebtoken";


export const generateQR = async (req, res) => {
    try {
        const { track } = req.query;
        const course = await CourseModel.findOne({ name: track });
        if (!course) {
            return res.status(400).json({ error: "Track not found" });
        }
        const payload = {
            track: req.query.track,
            timestamp: Date.now(),
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5s" });
        const qrCode = await toDataURL(token);
        res.json({ qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate QR code" });
    }
}


export const validateQR =  async (req, res) => {
    const { token, studentId } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await StudentModel.findOne({ studentId, course: decoded.track });
        if (!student) {
            return res.status(400).json({ error: "Student not enrolled in this course" });
        }
        const attendance = new AttendanceModel({
            studentId,
            track: decoded.track,
        });
        await AttendanceModel.save();
        res.json({ success: true, message: "Attendance marked" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Invalid or expired QR code" });
    }
}