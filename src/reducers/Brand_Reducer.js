import {
	REQUEST_BRAND_POSTS,
	RECEIVE_BRAND_POSTS,
  } from '../actions/types';

  const INITIAL_STATE = {
	category_content_posts: {},
	isFetching: false,
  };


  const Brand_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_BRAND_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_BRAND_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        brand_content_posts: action.brand_content_posts,
	      })
	    default:
	      return state
  }
}
  export default Brand_Reducer;
