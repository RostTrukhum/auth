import { Router } from "express";
import {login, register, getUsers} from './authConroller.js'
import {check} from 'express-validator'
import { middleware } from "./middleware/authMiddleware.js";
import { roleMiddleware } from "./middleware/roleMiddleware.js";

export const router = Router()

router.post('/register', [
    check('username', 'User name coud not to be empty').notEmpty(),
    check('password', 'Password must be at least 4 symboles').isLength({min: 4})] ,register)
router.post('/login',login)
router.get('/users', roleMiddleware(['USER', 'ADMIN']), getUsers)