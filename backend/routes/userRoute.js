import express from 'express';

import { signupUser, loginUser } from '../controllers/userController.js';
const router = express.Router();
// routing

// signup
router.post('/signup', signupUser);
// login
router.post('/login', loginUser);



export default router;