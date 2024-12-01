import { Router } from 'express';
import handelError from '../../handelError/handelError.js';
import { addStudent, deleteStuent, updateStudent } from './students.controller.js';
import auth from '../../auth/auth.js';
const router = Router();
router.post("/add-student", auth, handelError(addStudent));
router.delete("/delete-student/:id", auth, handelError(deleteStuent));
router.put("/update-student/:id", auth, handelError(updateStudent));
export default router