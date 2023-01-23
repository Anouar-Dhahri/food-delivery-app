import express from 'express';
const app = express()
import cors from 'cors'
import path from 'path';
import dotenv from'dotenv';
const port = process.env.PORT || 8000;

import { dbConnect } from './configs/dbConnection.js';

import { router as authRoute } from './routes/Auth.routes.js'
import { router as adminRoute } from './routes/Admin.routes.js'
import { router as clientRoute } from './routes/Client.routes.js'
import { router as orderRoute } from './routes/Order.routes.js'
import { router as dashRoute } from './routes/Dash.routes.js'
import { router as employeRoute } from './routes/Employe.routes.js'
import { router as itemRoute } from './routes/Item.routes.js'
import { router as menuRoute } from './routes/Menu.routes.js'
import { router as restaurantRoute } from './routes/Restaurant.routes.js'

dotenv.config();

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/clients', clientRoute);
app.use('/api/orders', orderRoute);
app.use('/api/dash', dashRoute);
app.use('/api/employees', employeRoute);
app.use('/api/items', itemRoute);
app.use('/api/menus', menuRoute);
app.use('/api/restaurants', restaurantRoute);

dbConnect();

app.get('/', (req, res) => res.send('The server is working !'));
app.listen(port, () => console.log(`Server is running on port ${port}!`));