import {
	REQUEST_COUNTRY_LIST_POSTS,
	RECEIVE_COUNTRY_LIST_POSTS,
  } from '../actions/types';

  const INITIAL_STATE = {
	info_posts: {},
	isFetching: false,
  };


  const GetCountries = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_COUNTRY_LIST_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_COUNTRY_LIST_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        info_posts: action.posts,
	      })
	    default:
	      return state
  }
}
  export default GetCountries;
