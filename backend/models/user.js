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

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }catch(error){
        console.log(error);
    }
})

userSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}
export const User = mongoose.model('User', userSchema);