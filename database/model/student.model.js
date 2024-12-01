import mongoose, { model, Schema } from "mongoose";
const StudentSchema = new Schema({
    name: { type: String, required: true },
    courseId: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }],
    createdAt: { type: Date, default: Date.now },
});
const StudentModel = model("Student", StudentSchema);
export default StudentModel