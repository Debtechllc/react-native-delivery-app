import {
	REQUEST_SHOPPING_LIST,
	RECEIVE_SHOPPING_LIST,
  } from '../actions/types';

  const INITIAL_STATE = {
	posts: {},
	isFetching: false,
  };


  const ShoppingList = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_SHOPPING_LIST:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_SHOPPING_LIST:
	      return Object.assign({}, state, {
	        isFetching: false,
	        posts: action.posts,
	      })
	    default:
	      return state
  }
}
  export default ShoppingList;
