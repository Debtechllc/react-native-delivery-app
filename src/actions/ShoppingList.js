import fetch from 'cross-fetch'
import {
	REQUEST_SHOPPING_LIST,
	RECEIVE_SHOPPING_LIST,

  } from './types';
	import { WEBSERVICE_URL} from '../config/config'
	import { SHOPPING_LIST_REQUEST} from '../config/serveraction'

	function requestPostsForShoppingList(data) {
	  return {
	    type: REQUEST_SHOPPING_LIST,
	    payload: {data},
	  }
	}

	function receivePostsForShoppingList(data,jsonresp) {
	  return {
	    type: RECEIVE_SHOPPING_LIST,
	    payload: {data},
			posts: {jsonresp}
	  }
	}


	function fetchPostsForShoppingList(data) {
		console.log('data'+data)
	  return dispatch => {
	    dispatch(requestPostsForShoppingList(data))
			console.log('https://www.reddit.com/r/'+data.param1+'.json')
	    return fetch(WEBSERVICE_URL+SHOPPING_LIST_REQUEST+'?user_id='+ data.userID)
	      .then(response => response.json())
	      .then(json => dispatch(receivePostsForShoppingList(data, json)))
	  }
	}

	function shouldFetchPostsForShoppingList(state, subreddit) {
	  if (state.isFetching) {
	    return false
	  } else {
	    return true
	  }
	}

	 function fetchPostsForShoppingListIfNeeded(data) {
	  // Note that the function also receives getState()
	  // which lets you choose what to dispatch next.

	  // This is useful for avoiding a network request if
	  // a cached value is already available.

	  return (dispatch, getState) => {
	    if (shouldFetchPostsForShoppingList(getState(), data)) {
	      // Dispatch a thunk from thunk!
	      return dispatch(fetchPostsForShoppingList(data))
	    } else {
	      // Let the calling code know there's nothing to wait for.
	      return Promise.resolve()
	    }
	  }
	}
export {fetchPostsForShoppingListIfNeeded}
