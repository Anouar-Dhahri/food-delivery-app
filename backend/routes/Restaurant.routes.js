import express from "express";
import { findAll, create, update, remove } from './../controllers/Restaurants.Controller.js'
import { upload } from '../helpers/file.helper.js';

export const router = express.Router();

router.get('/get', findAll)
router.post('/create', upload.single('image'), create)
router.put('/update/:id', upload.single('image'), update)
router.delete('/remove/:id', remove)