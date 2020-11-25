import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
        
    firstName:{
        type: String,
        required: true,
        trim: true,
        min:5,
        max:20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type:String
    },
    profilePicture: {
        type: String
    }
},
    {timestamps: true}
)

export const User = mongoose.model('User', userSchema);