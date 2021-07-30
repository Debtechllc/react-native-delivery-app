import {
	REQUEST_CATEGORY_POSTS,
	RECEIVE_CATEGORY_POSTS,
  } from '../actions/types';

  const INITIAL_STATE = {
	category_content_posts: {},
	isFetching: false,
  };


  const Category_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_CATEGORY_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_CATEGORY_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        category_content_posts: action.category_content_posts,
	      })
	    default:
	      return state
  }
}
  export default Category_Reducer;
