import {
	REQUEST_PRODUCT_POSTS,
	RECEIVE_PRODUCT_POSTS,
  } from '../actions/types';

  const INITIAL_STATE = {
	product_content_posts: {},
	isFetching: false,
  };


  const Product_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_PRODUCT_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_PRODUCT_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        product_content_posts: action.product_content_posts,
	      })
	    default:
	      return state
  }
}
  export default Product_Reducer;
