import { Router } from 'express';
import { addCourse, addStudentToCourse, getAllCourses, getAllStudentCourse, getCourseByID } from './courses.controller.js';
import handelError from '../../handelError/handelError.js';
import auth from '../../auth/auth.js';
import autAdmin from '../../auth/authAdmin.js';
const router = Router();
router.post("/add-course", autAdmin, handelError(addCourse));
router.get('/getAllCourses', auth, handelError(getAllCourses))
router.get('/getCourse/:id', auth, handelError(getCourseByID))
router.get('/getAllStudentCourse/:courseId', auth, handelError(getAllStudentCourse))
router.post('/add-student-course/:courseId', auth, handelError(addStudentToCourse))
export default router