import {
	REQUEST_CHECKOUT_INFO_POSTS,
	RECEIVE_CHECKOUT_INFO_POSTS,
  } from '../actions/types';

  const INITIAL_STATE = {
	info_posts: {},
	address:"",
	isFetching: false,
  };


  const Checkout_Info_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_CHECKOUT_INFO_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_CHECKOUT_INFO_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        info_posts: action.posts,
	      })
	    default:
	      return state
  }
}
  export default Checkout_Info_Reducer;
