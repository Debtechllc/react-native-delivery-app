import fetch from 'cross-fetch'
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,

  } from './types';
	import { WEBSERVICE_URL} from './../config/config'
	import { PRODUCT_LIST} from './../config/serveraction'

	function requestPosts(data) {
	  return {
	    type: REQUEST_POSTS,
	    payload: {data},
	  }
	}

	function receivePosts(data,jsonresp) {
	  return {
	    type: RECEIVE_POSTS,
	    payload: {data},
			posts: {jsonresp}
	  }
	}


	function fetchPosts(data) {
		console.log('data'+data)
	  return dispatch => {
	    dispatch(requestPosts(data))
			console.log('https://www.reddit.com/r/'+data.param1+'.json')
	    return fetch(WEBSERVICE_URL+PRODUCT_LIST+'?user_id=2&mall_id=21&checking=true')
	      .then(response => response.json())
	      .then(json => dispatch(receivePosts(data, json)))
	  }
	}

	function shouldFetchPosts(state, subreddit) {
	  if (state.isFetching) {
	    return false
	  } else {
	    return true
	  }
	}

	 function fetchPostsIfNeeded(data) {
	  // Note that the function also receives getState()
	  // which lets you choose what to dispatch next.

	  // This is useful for avoiding a network request if
	  // a cached value is already available.

	  return (dispatch, getState) => {
	    if (shouldFetchPosts(getState(), data)) {
	      // Dispatch a thunk from thunk!
	      return dispatch(fetchPosts(data))
	    } else {
	      // Let the calling code know there's nothing to wait for.
	      return Promise.resolve()
	    }
	  }
	}
export {fetchPostsIfNeeded}
