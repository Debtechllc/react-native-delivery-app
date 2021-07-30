import fetch from 'cross-fetch'
import {
	REQUEST_CATEGORY_POSTS,
	RECEIVE_CATEGORY_POSTS,

  } from './types';
	import { WEBSERVICE_URL} from '../config/config'
	import { CATEGORY_LIST} from '../config/serveraction'

	function requestCategoryPosts(data) {
	  return {
	    type: REQUEST_CATEGORY_POSTS,
	    payload: {data},
	  }
	}

	function receiveCategoryPosts(data,jsonresp) {
	  return {
	    type: RECEIVE_CATEGORY_POSTS,
	    payload: {data},
			category_content_posts: jsonresp
	  }
	}


	function fetchCategoryPosts(data) {
		console.log('data'+data)
	  return dispatch => {
	    dispatch(requestCategoryPosts(data))
	    return fetch(WEBSERVICE_URL+CATEGORY_LIST)
				.then(response => response.json())
				.then((responseJson) => {
					if (responseJson.error == 0) {
					   	dispatch(receiveCategoryPosts(data, responseJson))
					}
			})
	  }
	}

	function shouldFetchCategoryPosts(state, subreddit) {
	  if (state.isFetching) {
	    return false
	  } else {
	    return true
	  }
	}

	 function fetchCategoryPostsIfNeeded(data) {
	  // Note that the function also receives getState()
	  // which lets you choose what to dispatch next.

	  // This is useful for avoiding a network request if
	  // a cached value is already available.

	  return (dispatch, getState) => {
	    if (shouldFetchCategoryPosts(getState(), data)) {
	      // Dispatch a thunk from thunk!
	      return dispatch(fetchCategoryPosts(data))
	    } else {
	      // Let the calling code know there's nothing to wait for.
	      return Promise.resolve()
	    }
	  }
	}
export {fetchCategoryPostsIfNeeded}
