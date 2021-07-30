import {
	REQUEST_ABOUT_US,
	RECEIVE_ABOUT_US,
  } from '../actions/types';

  const INITIAL_STATE = {
	about_us_content: {},
	isFetching: false,
  };


  const AboutUs = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_ABOUT_US:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_ABOUT_US:
	      return Object.assign({}, state, {
	        isFetching: false,
	        about_us_content: action.about_us_content,
	      })
	    default:
	      return state
  }
}
  export default AboutUs;
