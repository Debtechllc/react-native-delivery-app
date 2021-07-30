import fetch from 'cross-fetch'
import {
	REQUEST_PRODUCT_POSTS,
	RECEIVE_PRODUCT_POSTS,

  } from './types';
	import { WEBSERVICE_URL} from '../config/config'
	import { PRODUCT_LIST} from '../config/serveraction'

	function requestProductPosts(data) {
	  return {
	    type: REQUEST_PRODUCT_POSTS,
	    payload: {data},
	  }
	}

	function receiveProductPosts(data,jsonresp) {
	  return {
	    type: RECEIVE_PRODUCT_POSTS,
	    payload: {data},
			product_content_posts: jsonresp
	  }
	}


	function fetchProductPosts(data) {
		console.log('data'+data)
	  return dispatch => {
			dispatch(requestProductPosts(data))
			return fetch(WEBSERVICE_URL+PRODUCT_LIST, {
				method: 'POST',
				headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
				},
				body: JSON.stringify({"category_slug":data.category_id}),
		})
				.then(response => response.json())
				.then((responseJson) => {
					if (responseJson.error == 0) {
					   	dispatch(receiveProductPosts(data, responseJson))
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

	 function fetchProductPostsIfNeeded(data) {
	  // Note that the function also receives getState()
	  // which lets you choose what to dispatch next.

	  // This is useful for avoiding a network request if
	  // a cached value is already available.

	  return (dispatch, getState) => {
	    if (shouldFetchProductPosts(getState(), data)) {
	      // Dispatch a thunk from thunk!
	      return dispatch(fetchProductPosts(data))
	    } else {
	      // Let the calling code know there's nothing to wait for.
	      return Promise.resolve()
	    }
	  }
	}
export {fetchProductPostsIfNeeded}
