import express from 'express';
import { register, login, logout, isLoggedIn } from '../controller/index.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/isLoggedIn', isLoggedIn);

export default router;