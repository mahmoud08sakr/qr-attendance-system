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
export const deleteStuent = (req, res) => {
    const { id } = req.params;
    try {
        const student = StudentModel.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete student" });
    }
}
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, courseId, phone, email } = req.body;
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (email) updateFields.email = email;
    try {
        const student = await StudentModel.findByIdAndUpdate(id, updateFields, { new: true });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json({ message: "Student updated successfully", student });
    } catch (error) {
        res.status(500).json({ error: "Failed to update student" });
    }
};
