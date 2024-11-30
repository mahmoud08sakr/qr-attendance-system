import { Router } from 'express';
import { addCourse, addStudentToCourse, getAllCourses, getAllStudentCourse, getCourseByID } from './courses.controller.js';
import handelError from '../../handelError/handelError.js';
import auth from '../../auth/auth.js';
const router = Router();
router.post("/add-course", auth, handelError(addCourse));
router.get('/getAllCourses', auth, handelError(getAllCourses))
router.get('/getCourse/:id', auth, handelError(getCourseByID))
router.get('/getAllStudentCourse/:courseId', auth, handelError(getAllStudentCourse))
router.post('/add-student-course/:courseId', auth, handelError(addStudentToCourse))
export default router