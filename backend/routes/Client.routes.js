import express from "express";
import { findAll, handleStatus, remove } from './../controllers/Clients.Controller.js'

export const router = express.Router();

router.get('/get', findAll)
router.put('/stat/:id', handleStatus)
router.delete('/remove/:id', remove)