import express from "express";
import { findAll, findByState, create, update, remove, available} from './../controllers/Employees.Controller.js'

export const router = express.Router();

router.get('/get', findAll)
router.get('/get/:etat', findByState)
router.post('/create', create)
router.put('/update/:id', update)
router.put('/stat/:id', available)
router.delete('/remove/:id', remove)