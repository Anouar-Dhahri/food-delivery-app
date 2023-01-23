import express from "express";
import { register, login, profile, resetpassword, changePassword, ChangeEmail } from "../controllers/Auth.Controller.js";
export const router = express.Router();

router.post('/register', register)

router.post('/login', login)

router.put('/profile/:id', profile)

router.post('/resetpassword', resetpassword)

router.put('/updatemail/:id', ChangeEmail)

router.put('/updatepassword/:id', changePassword)