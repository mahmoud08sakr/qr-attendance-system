import { toDataURL } from "qrcode";
import AttendanceModel from "../../../database/model/attendence.model.js";
import CourseModel from "../../../database/model/course.model.js";
import StudentModel from '../../../database/model/student.model.js';
import jwt from "jsonwebtoken";
export const generateQR = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await CourseModel.findOne({ name: track });
        if (!course) {
            return res.status(400).json({ error: "Track not found" });
        }
        const payload = {
            track: req.query.courseId,
            timestamp: Date.now(),
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30s" });
        const qrCode = await toDataURL(token);
        res.json({ qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate QR code" });
    }
}
export const validateQR = async (req, res) => {
    const { token, studentId } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await StudentModel.findOne({ studentId, courseId: decoded.courseId });
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
export const getAttendance = async (req, res) => {
    const { token } = req.query;
    const { email } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        try {
            const student = await StudentModel.findOne({ email });
            if (!student) {
                return res.status(404).json({ error: "Student not found" });
            }
            let attendanceRecord = await AttendanceModel.findOne({ track: decoded.track });
            if (!attendanceRecord) {
                attendanceRecord = new AttendanceModel({
                    track: decoded.track,
                    students: [{ studentId: student._id, date: new Date() }],
                });
            } else {
                const today = new Date();
                today.setHours(0, 0, 0, 0); 
                const alreadyMarkedToday = attendanceRecord.students.some(
                    (entry) =>
                        entry.studentId.toString() === student._id.toString() &&
                        new Date(entry.date).setHours(0, 0, 0, 0) === today.getTime()
                );
                if (alreadyMarkedToday) {
                    return res.status(400).json({ error: "Attendance already marked for today" });
                }
                attendanceRecord.students.push({ studentId: student._id, date: new Date() });
            }
            await attendanceRecord.save();
            res.json({ success: true, message: "Attendance marked" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to mark attendance" });
        }
    });
};