import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import createError from "http-errors"
import cors from "cors";

dotenv.config(); 
//---------------------------------import database reference------------------------------
import './helpers/init_mongodb.js';


//----------------------------------import routes------------------------------------------
import authroutes from './routes/auth.js';

//----------------------------------import JWT----------------------------------------------
import { verifyAccessToken} from './helpers/jwt_helper.js';


const port = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', verifyAccessToken, async(req, res, next)=>{           // welcome route
    res.send("Welcome to the app!");
})

app.use('/api', authroutes);                    // auth routes
                                             
app.use(async(req, res, next)=>{                // Not found route
    next(createError.NotFound());
})

app.use((err, req, res, next)=>{                // error handling
    res.status(err.status || 500 );         
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})



app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})