import CourseModel from "../../../database/model/course.model.js";

export const addCourse = async (req, res) => {
    const { name } = req.body;
    try {
        const newCourse = new CourseModel({ name });
        await newCourse.save();
        res.status(200).json({ message: "Course added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add course" });
    }
}