import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

//import database reference

import './helpers/init_mongodb.js';

//import routes

import authroutes from './routes/auth.js';

// instance for dotenv
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authroutes);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})