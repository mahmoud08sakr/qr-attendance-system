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

export const getAllCourses = async (req, res) => {
    let data = await CourseModel.find({});
    res.json({ data });
}

export const getCourseByID = async (req, res) => {
    const { id } = req.params;
    let data = await CourseModel.findById(id);
    if (data) {
        res.json({ data });
    } else {
        res.status(404).json({ error: "Course not found" });
    }
}

export const getAllStudentCourse = async (req, res) => {

    const { courseId } = req.params;
    let data = await CourseModel.findById(courseId).populate('studentId');
    if (data) {
        res.json({ data });
    } else {
        res.status(404).json({ error: "Course not found" });
    }
}

export const addStudentToCourse = async (req, res) => {
    const { courseId } = req.params;
    console.log(courseId);
    
    const { studentId } = req.body;
    try {
        const course = await CourseModel.findById(courseId);
        console.log(course);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        course.studentId.push(studentId);
        await course.save();
        res.status(200).json({ message: "Student added to course successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add student to course" });
    }
}