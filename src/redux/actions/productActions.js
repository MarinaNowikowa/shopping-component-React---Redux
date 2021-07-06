import {
    GET_PRODUCTS,
    SEARCH_PRODUCT,
 }
  from "./types"

export const getProducts = (products) =>  dispatch => {
    dispatch({
    type: GET_PRODUCTS,
    payload: products
   })
  
 };

export const searchProduct = (text) => dispatch=>{
     dispatch({
        type: SEARCH_PRODUCT,
        payload: text
      });
}
