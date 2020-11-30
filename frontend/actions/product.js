import axios from 'axios';
import react from 'react';


// ---------------------------getparams-----------------------

export default (query) => {
    if(query){
        const queryString = query.split("?")[1];
        if(queryString.length > 0){
            const params = queryString.split("&");
            const paramsObj = {};
            params.forEach(param => {
                const keyValue = param.split("=");
                paramsObj[keyValue[0]] = keyValue[1];
            });

            return paramsObj;
        }
    }

    return {};
}

// -----------------------container----------------------------------

const ProductListPage = ()=>{

    const renderProduct = () => {

    }
}


export const getProductPage = ()=> async dispatch =>{
    try {
        
    } catch (error) {
        
    }
}