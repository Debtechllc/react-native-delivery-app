import {
	REQUEST_ADD_TO_WISH_LIST,
	RECEIVE_ADD_TO_WISH_LIST,
  } from '../actions/types';

  const INITIAL_STATE = {
	add_to_wish_list_content: {},
	isFetching: false,
  };


  const AddToWish_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_ADD_TO_WISH_LIST:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_ADD_TO_WISH_LIST:
	      return Object.assign({}, state, {
	        isFetching: false,
	        add_to_wish_list_content: action.add_to_wish_list_content,
	      })
	    default:
	      return state
  }
}
  export default AddToWish_Reducer;
