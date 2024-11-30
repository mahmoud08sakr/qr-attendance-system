import CourseModel from "../../../database/model/course.model.js";
import StudentModel from "../../../database/model/student.model.js";

export const addStudent = async (req, res) => {
    const { name, courseId } = req.body;
    try {
        const existingCourse = await CourseModel.findById(courseId);
        if (!existingCourse) {
            return res.status(400).json({ error: "Course not found" });
        }
        const newStudent = new StudentModel({ name, courseId });
        await newStudent.save();
        res.status(200).json({ message: "Student added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add student" });
    }
}