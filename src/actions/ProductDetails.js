import fetch from 'cross-fetch'
import {
	REQUEST_PRODUCT_DETAILS_POSTS,
	RECEIVE_PRODUCT_DETAILS_POSTS,

  } from './types';
	import { WEBSERVICE_URL} from '../config/config'
	import { PRODUCT_DETAILS} from '../config/serveraction'

	function requestProductDetails(data) {
	  return {
	    type: REQUEST_PRODUCT_DETAILS_POSTS,
	    payload: {data},
	  }
	}

	function receiveProductDetails(data,jsonresp) {
	  return {
	    type: RECEIVE_PRODUCT_DETAILS_POSTS,
	    payload: {data},
            product_detais: jsonresp
	  }
	}


	function fetchProductDetails(data) {
		console.log('data'+data)
	  return dispatch => {
			dispatch(requestProductDetails(data))
			return fetch(WEBSERVICE_URL+PRODUCT_DETAILS, {
				method: 'POST',
				headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
				},
				body: JSON.stringify({"slug":data.slug}),
		})
				.then(response => response.json())
				.then((responseJson) => {
					if (responseJson.error == 0) {
						//	console.warn(responseJson)
					   	dispatch(receiveProductDetails(data, responseJson))
					}
			})
	  }
	}

	function shouldFetchProductPosts(state, subreddit) {
	  if (state.isFetching) {
	    return false
	  } else {
	    return true
	  }
	}

	 function fetchProductDetailsIfNeeded(data) {
	  // Note that the function also receives getState()
	  // which lets you choose what to dispatch next.

	  // This is useful for avoiding a network request if
	  // a cached value is already available.

	  return (dispatch, getState) => {
	    if (shouldFetchProductPosts(getState(), data)) {
	      // Dispatch a thunk from thunk!
	      return dispatch(fetchProductDetails(data))
	    } else {
	      // Let the calling code know there's nothing to wait for.
	      return Promise.resolve()
	    }
	  }
	}
export {fetchProductDetailsIfNeeded}
