import express from "express";
import { findAll, getHistory, create, handleStatus, affect, remove } from './../controllers/Order.Controller.js'
export const router = express.Router();

router.get('/get', findAll)
router.get('/history/:id', getHistory)
router.post('/create', create)
router.put('/stat/:id', handleStatus)
router.put('/affect/:id', affect)
router.delete('/remove/:id', remove)