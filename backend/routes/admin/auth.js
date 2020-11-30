import express from 'express';
import { signup, login}  from '../../controllers/admin/auth.js'

const router = express.Router();

router.post('/admin/signup', signup);
router.post('/admin/login', login);
//router.post('/admin/refresh-token', refreshToken);
//router.delete('/admin/logout', logout);

export default router;
