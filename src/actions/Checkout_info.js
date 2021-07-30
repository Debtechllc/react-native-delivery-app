import fetch from 'cross-fetch'
import {
    REQUEST_CHECKOUT_INFO_POSTS,
    RECEIVE_CHECKOUT_INFO_POSTS,

} from './types';
import { WEBSERVICE_URL } from '../config/config'
import { CHECKOUT_INFO_REQUEST } from '../config/serveraction'
import { NavigationActions } from 'react-navigation';

function requestForGetCart(data) {
    return {
        type: REQUEST_CHECKOUT_INFO_POSTS,
        payload: { data },
    }
}

function receiveGetCart(data, jsonresp) {
    return {
        type: RECEIVE_CHECKOUT_INFO_POSTS,
        payload: { data },
        posts: { jsonresp }
    }
}


function getCart(data) {
    return dispatch => {
        dispatch(requestForGetCart(data))
        return fetch(WEBSERVICE_URL + CHECKOUT_INFO_REQUEST, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"user_id":data.user_id}),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
             console.log(responseJson.error)
            //  if (responseJson.encData.error == 0) {
            //      console.warn("Go to home")
                dispatch(receiveGetCart(data, responseJson))
             //}
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
function shouldGetCart(state, subreddit) {
    if (state.isFetching) {
        return false
    } else {
        return true
    }
}

function fetchCheckoutInfoIfNeeded(data) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.


    return (dispatch, getState) => {
        if (shouldGetCart(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(getCart(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}
export { fetchCheckoutInfoIfNeeded }
