import {
	REQUEST_CONTACT_US,
	RECEIVE_CONTACT_US,
  } from '../actions/types';

  const INITIAL_STATE = {
	contact_us_content: {},
	isFetching: false,
  };


  const ContactUs_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_CONTACT_US:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_CONTACT_US:
	      return Object.assign({}, state, {
	        isFetching: false,
	        contact_us_content: action.contact_us_content,
	      })
	    default:
	      return state
  }
}
  export default ContactUs_Reducer;
