import { Router } from 'express';
import handelError from '../../handelError/handelError.js';
import { addStudent } from './students.controller.js';
import auth from '../../auth/auth.js';
const router = Router();
router.post("/add-student", auth, handelError(addStudent));
export default router