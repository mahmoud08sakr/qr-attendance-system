import { Router } from 'express';
import { addCourse } from './courses.controller.js';
import handelError from '../../handelError/handelError.js';
import auth from '../../auth/auth.js';
const router = Router();
router.post("/add-course", auth, handelError(addCourse));
export default router