import { Router } from 'express';
import handelError from '../../handelError/handelError.js';
import { generateQR, validateQR } from './qr.controller.js';
const router = Router();
router.get("/generate-qr", handelError(generateQR));
router.post("/validate-qr/:courseId", handelError(validateQR));
export default router