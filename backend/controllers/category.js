import slugify from 'slugify';
import { Category } from '../models/category.js'
import createError from 'http-errors'

function categoryLists (result, parentId = null){

    let category;
    let categoryList = [];
    if (parentId == null) {
        category = result.filter(cat => cat.parentId == undefined);
        
    } else {
        category = result.filter(cat => cat.parentId == parentId);
        
    }

    for(let cat of category){
        categoryList.push({
            id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: categoryLists( result, parentId = cat._id)
        })
    }
    return categoryList;

}
export const getCategory = async(req, res, next)=>{
    try {
        const result = await Category.find({});
        const list =  categoryLists(result);

        res.send(list);
    } catch (error) {
        next(error)
    }
}
export const createCategory = async(req, res, next)=>{
    try {
        const result = await req.body;
        result.slug = slugify(result.name);
        console.log(result.slug)
        const category = new Category(result);
        const d =await category.save();
        
        res.send(category);  //temporary response
    } catch (error) {
        next(error);
    }
}

