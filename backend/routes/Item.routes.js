import express from "express";
import { findAll, create, update, remove } from './../controllers/Items.Controller.js'
import { upload } from '../helpers/file.helper.js';

export const router = express.Router();

router.get('/get/:id', findAll)
router.post('/create', upload.single('image'), create)
router.put('/update/:id', upload.single('image'), update)
router.delete('/remove/:id', remove)