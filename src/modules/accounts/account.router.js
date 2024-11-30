import { Router } from 'express';
import { signIn, signUp } from './account.controller.js';
import handelError from '../../handelError/handelError.js';
const router = Router();
router.post('/signUp', handelError(signUp))
router.post('/signIn', handelError(signIn))

export default router