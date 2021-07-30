import {
	REQUEST_MY_WISH_LIST,
	RECEIVE_MY_WISH_LIST,
  } from '../actions/types';
	import Navigator from '../Navigator';
	import { NavigationActions } from 'react-navigation';

  const INITIAL_STATE = {
		mywishlist_content: {},
		isFetching: false,
  };


  const MyWishlist_Reducer = (state = INITIAL_STATE, action) => {
		switch (action.type) {

	    case REQUEST_MY_WISH_LIST:
	      return Object.assign({}, state, {
	        isFetching: true,
	      })
			case RECEIVE_MY_WISH_LIST:
				
	    return Object.assign({}, state, {
					isFetching: false,
	        mywishlist_content: action.mywishlist_content,
				})
	    default:
	      return state
  }
}
  export default MyWishlist_Reducer;
