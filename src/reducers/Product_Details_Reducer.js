import {
	REQUEST_PRODUCT_DETAILS_POSTS,
	RECEIVE_PRODUCT_DETAILS_POSTS,
  } from '../actions/types';

  const INITIAL_STATE = {
	product_detais: {},
	isFetching: false,
  };


  const Product_Details_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_PRODUCT_DETAILS_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_PRODUCT_DETAILS_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        product_detais: action.product_detais,
	      })
	    default:
	      return state
  }
}
  export default Product_Details_Reducer;
