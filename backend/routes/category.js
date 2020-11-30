import express from 'express';
import { login } from '../controllers/admin/auth.js';
import {createCategory, getCategory} from "../controllers/category.js";
import { verifyAdminAccess } from '../helpers/jwt_helper.js';

const router = express.Router();

router.post('/category/create',verifyAdminAccess, createCategory);
router.get('/category/getcategories',  getCategory)

export default router;









