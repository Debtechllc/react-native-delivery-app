import {
	REQUEST_ADDTO_CART,
	RECEIVE_ADDTO_CART,
  } from '../actions/types';
	import Navigator from '../Navigator';
	import { NavigationActions } from 'react-navigation';

  const INITIAL_STATE = {
    posts: {},
		isFetching: false,
  };


  const AddToCart = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_ADDTO_CART:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
			case RECEIVE_ADDTO_CART:
	    return Object.assign({}, state, {
					isFetching: false,
            posts: action.posts,
						
				})
	    default:
	      return state
  }
}
  export default AddToCart;
