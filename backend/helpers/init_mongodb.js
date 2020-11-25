import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('Mongodb connected! ');
    })
    .catch( err =>{
        console.log(err.message);
    })

    mongoose.connection.on('connected', ()=>{
        console.log('Mongoose connected to db');
    })

    mongoose.connection.on('error', (error)=>{
        console.log(error.message);
    })

    mongoose.connection.on('disconnected', ()=>{
        console.log('Mongoose connection is disconnected!');
    })

    process.on('SIGINT', async ()=>{
        await mongoose.connection.close();
        process.exit(0);
    })