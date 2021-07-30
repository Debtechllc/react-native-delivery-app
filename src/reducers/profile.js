import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
  } from '../actions/types';

  const INITIAL_STATE = {
	posts: {},
	isFetching: false,
  };


  const Profile = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_POSTS:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_POSTS:
	      return Object.assign({}, state, {
	        isFetching: false,
	        posts: action.posts,
	      })
	    default:
	      return state
  }
}
  export default Profile;
