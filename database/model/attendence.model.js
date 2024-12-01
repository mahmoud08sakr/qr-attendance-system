import { model, Schema } from "mongoose";

const AttendanceSchema = new Schema({
    track: { type: String, required: true },
    students: [
        {
            studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
            date: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const AttendanceModel = model("Attendance", AttendanceSchema);
export default AttendanceModel;