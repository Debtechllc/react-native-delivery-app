import {
	REQUEST_MY_CART,
	RECEIVE_MY_CART,
  } from '../actions/types';

  const INITIAL_STATE = {
	my_cart: {},
	isFetching: false,
  };


  const My_Cart_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_MY_CART:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
	    case RECEIVE_MY_CART:
	      return Object.assign({}, state, {
	        isFetching: false,
	        my_cart: action.posts,
	      })
	    default:
	      return state
  }
}
  export default My_Cart_Reducer;
