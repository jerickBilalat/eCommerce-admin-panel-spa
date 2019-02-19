
import { 
  FETCH_PRODUCTS_STARTED,
  FETCH_PRODUCTS_SUCCEEDED, 
  FETCH_PRODUCTS_FAILED,
  SAVE_PRODUCT_STARTED,
  CREATE_PRODUCT_SUCCEEDED,
  UPDATE_PRODUCT_SUCCEEDED,
  SAVE_PRODUCT_FAILED,
  DELETE_PRODUCT
} from "../actions/types";

const initialState = {
  products: [],
  isLoading: false,
  isSaving: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_STARTED:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        products: action.payload,
        isLoading: false
      }
    case FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false
      }
    case SAVE_PRODUCT_STARTED:
      return {
        ...state,
        isSaving: true
      }
    case CREATE_PRODUCT_SUCCEEDED:
      return {
        ...state,
        products: [...state.products, action.payload],
        isSaving: false
      }
    case UPDATE_PRODUCT_SUCCEEDED:
      const updatedProductID = action.payload._id;
      return {
        ...state,
        products: [
          ...state.products.filter( item => item._id !== updatedProductID ),
          action.payload
        ],
        isSaving: false
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: [...state.products.filter( item => item._id !== action.payload)]
      }
    case SAVE_PRODUCT_FAILED:
      return {
        ...state,
        isSaving: false
      }
    default:
      return state;
  }
}