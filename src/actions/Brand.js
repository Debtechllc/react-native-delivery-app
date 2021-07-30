import fetch from 'cross-fetch'
import {
	REQUEST_BRAND_POSTS,
	RECEIVE_BRAND_POSTS,

  } from './types';
	import { WEBSERVICE_URL} from '../config/config'
	import { BRAND_LIST} from '../config/serveraction'

	function requestBrandPosts(data) {
	  return {
	    type: REQUEST_BRAND_POSTS,
	    payload: {data},
	  }
	}

	function receiveBrandPosts(data,jsonresp) {
	  return {
	    type: RECEIVE_BRAND_POSTS,
	    payload: {data},
			brand_content_posts: jsonresp
	  }
	}


	function fetchBrandPosts(data) {
		console.log('data'+data)
	  return dispatch => {
	    dispatch(requestBrandPosts(data))
	    return fetch(WEBSERVICE_URL+BRAND_LIST)
				.then(response => response.json())
				.then((responseJson) => {
					if (responseJson.error == 0) {
					   	dispatch(receiveBrandPosts(data, responseJson))
					}
			})
	  }
	}

	function shouldFetchBrandPosts(state, subreddit) {
	  if (state.isFetching) {
	    return false
	  } else {
	    return true
	  }
	}

	 function fetchBrandPostsIfNeeded(data) {
	  // Note that the function also receives getState()
	  // which lets you choose what to dispatch next.

	  // This is useful for avoiding a network request if
	  // a cached value is already available.

	  return (dispatch, getState) => {
	    if (shouldFetchBrandPosts(getState(), data)) {
	      // Dispatch a thunk from thunk!
	      return dispatch(fetchBrandPosts(data))
	    } else {
	      // Let the calling code know there's nothing to wait for.
	      return Promise.resolve()
	    }
	  }
	}
export {fetchBrandPostsIfNeeded}
