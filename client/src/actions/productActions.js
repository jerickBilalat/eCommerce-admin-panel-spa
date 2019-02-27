

import {CALL_API} from "../middlewares/api";
// import { makeCall } from "../api";
import { makeCall } from "../api/productsMockApi";
import { 
  FETCH_PRODUCTS_STARTED, 
  FETCH_PRODUCTS_SUCCEEDED, 
  FETCH_PRODUCTS_FAILED,
  SAVE_PRODUCT_STARTED,
  CREATE_PRODUCT_SUCCEEDED,
  UPDATE_PRODUCT_SUCCEEDED,
  SAVE_PRODUCT_FAILED,
  DELETE_PRODUCT
} from "./types";


// NOTE: fetching product is abstracted using middleware
export function fetchProducts() {
  return {
    [CALL_API] : {
      types: [FETCH_PRODUCTS_STARTED, FETCH_PRODUCTS_SUCCEEDED, FETCH_PRODUCTS_FAILED],
      endpoint: "/api/products"
    }
  }
}

// NOTE: creating and updating product is done using redux-thunk
export function createProductSucceeded(product) {
  return {
    type: CREATE_PRODUCT_SUCCEEDED, payload: product
  }
}

export function updateProductSucceeded(product) {
  return {
    type: UPDATE_PRODUCT_SUCCEEDED, payload: product
  }
}

export function saveProduct(body, productID) {
  return function(dispatch) {
    dispatch({ type:SAVE_PRODUCT_STARTED })
    if(productID) {
      return makeCall({method: "PUT", body: body, endpoint: `/api/update_product/${productID}`})
      .then(res => {
        dispatch(updateProductSucceeded(res.data))
      })
      .catch( err => {
        // notify
        dispatch({ type: SAVE_PRODUCT_FAILED })
      });
    }
    return makeCall({method : "POST", body: body, endpoint: "/api/create_product"})
      .then( res => {
          dispatch(createProductSucceeded(res.data))
      })
      .catch(err => {
        // notify
        dispatch({ type: SAVE_PRODUCT_FAILED })
      })
  }
}


export function deleteProduct(id) {
  return function(dispatch) {
   return makeCall({method: "DELETE", body: {}, endpoint: `/api/delete_product/${id}`})
      .then( res => {
        dispatch({ type: DELETE_PRODUCT, payload: id}) 
      })
      .catch( err => {
        throw err
      })
  }
}