import productsArr from "../../data/products.json";
import {
    GET_PRODUCTS,
    SEARCH_PRODUCT,
} from "../actions/types"

const initialState={
    products:productsArr,
    search: '',
}

export function productsReducer(state = initialState, {type, payload}) {
   switch(type){
       case GET_PRODUCTS:
           return {
            ...state,
            products:payload
        }
        case SEARCH_PRODUCT:
           return {
            ...state,
            search: payload          
           }
        
    default:
       return state;
   }
}