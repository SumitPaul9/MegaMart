import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required:true,
        unique: true
    },
    parentId:{
        type: String,

    }
},{timestamps:true});


// categorySchema.pre('save', async function(next){
//     try{
//         const newSlug = await slugify(this.name);
//         console.log(newSlug)
//         this.slug = newSlug;
//         next();
//     }catch(error){
//         console.log(error);
//         next(error);
//     }
// })

export const Category = mongoose.model('Category', categorySchema);