import express from "express";
import { findAll, findByRestaurent, findMenuItems, create, update, remove } from './../controllers/Menus.Controller.js'

export const router = express.Router();

router.get('/get', findAll)
router.get('/get/:id', findByRestaurent)
router.get('/getitems/:id', findMenuItems)
router.post('/create', create)
router.put('/update/:id', update)
router.delete('/remove/:id', remove)