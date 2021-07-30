import {
	HOME_REQUEST_POSTS,
	HOME_RECEIVE_POSTS,
  } from '../actions/types';

  const INITIAL_STATE = {
	posts: {},
	isFetching: false,
  };


  const Home = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case HOME_REQUEST_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case HOME_RECEIVE_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        posts: action.posts,
	      })
	    default:
	      return state
  }
}
  export default Home;
