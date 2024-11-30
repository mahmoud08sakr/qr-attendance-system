import { model, Schema } from "mongoose";
const CourseSchema = new Schema({
    name: { type: String, required: true },
    studentId: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }],
    createdAt: { type: Date, default: Date.now },
});
const CourseModel = model("Course", CourseSchema);
export default CourseModel