import express from "express";
import { dashbord} from './../controllers/Data.Controller.js'

export const router = express.Router();

router.get('/get', dashbord)