import fetch from 'cross-fetch'
import {
	REQUEST_ADD_TO_WISH_LIST,
	RECEIVE_ADD_TO_WISH_LIST,
  } from './types';
	import { WEBSERVICE_URL} from './../config/config'
	import { ADD_TO_WISH_LISt} from './../config/serveraction'
	function requestAddToWishList(data) {
	  return {
	    type: REQUEST_ADD_TO_WISH_LIST,
	    payload: {data},
	  }
	}
	function receiveAddToWishList(data,jsonresp) {
	  return {
	    type: RECEIVE_ADD_TO_WISH_LIST,
	    payload: {data},
			add_to_wish_list_content: {jsonresp}
	  }
	}
	function fetchAddToWishList(data) {
	//	console.log('data'+data)
	  return dispatch => {
	    dispatch(requestAddToWishList(data))
	    return fetch(WEBSERVICE_URL + ADD_TO_WISH_LISt, {
				method: 'POST',
				headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "user_id": data.user_id,"product_id": data.product_id,"immediately": data.immediately,"max_price": data.max_price,"wish_price": data.wish_price,"date_till": data.data,"checking": "true" }),
		})
		.then((response) => response.json())
		.then((responseJson) => {
				 //if (responseJson.error == 0) {
						dispatch(receiveAddToWishList(data, responseJson))
				// }
		})
		.catch((error) => {
				console.error(error);
		});
	  }
	}
	function shouldFetchAddToWishList(state, subreddit) {
	  if (state.isFetching) {
	    return false
	  } else {
	    return true
	  }
	}

	 function fetchAddToWishListIfNeeded(data) {
	  // Note that the function also receives getState()
	  // which lets you choose what to dispatch next.

	  // This is useful for avoiding a network request if
	  // a cached value is already available.

	  return (dispatch, getState) => {
	    if (shouldFetchAddToWishList(getState(), data)) {
	      // Dispatch a thunk from thunk!
	      return dispatch(fetchAddToWishList(data))
	    } else {
	      // Let the calling code know there's nothing to wait for.
	      return Promise.resolve()
	    }
	  }
	}
export {fetchAddToWishListIfNeeded}
