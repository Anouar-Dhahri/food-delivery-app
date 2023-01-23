import express from "express";
import { adminLogin, signup, profile } from './../controllers/Admin.Controller.js'
export const router = express.Router();

router.post('/register', signup)
router.post('/login', adminLogin)
router.put('/profile/:id', profile)

