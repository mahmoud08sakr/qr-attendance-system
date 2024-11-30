import { model, Schema } from "mongoose";
const AttendanceSchema = new Schema({
    studentId: String,
    track: String,
    date: { type: Date, default: Date.now },
});
const AttendanceModel = model("Attendance", AttendanceSchema);
export default AttendanceModel