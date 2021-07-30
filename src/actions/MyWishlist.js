import fetch from 'cross-fetch'
import {
    REQUEST_MY_WISH_LIST,
    RECEIVE_MY_WISH_LIST,

} from './types';
import { WEBSERVICE_URL } from '../config/config'
import { MY_WISH_LIST_SUB_URL } from '../config/serveraction'
import { NavigationActions } from 'react-navigation';

function requestForMyWishList(data) {
    return {
        type: REQUEST_MY_WISH_LIST,
        payload: { data },
    }
}

function receiveMyWishList(data, jsonresp) {
    return {
        type: RECEIVE_MY_WISH_LIST,
        payload: { data },
        mywishlist_content: {jsonresp}
    }
}


function MyWishlist(data) {
    return dispatch => {
       // console.warn('user_id',data.user_id)
        dispatch(requestForMyWishList(data))
        return fetch(WEBSERVICE_URL + MY_WISH_LIST_SUB_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id:data.user_id, checking:"true", lang_id:"en"}),
        })
        .then((response) => response.json())
        .then((responseJson) => {
           // console.warn(responseJson)
           dispatch(receiveMyWishList(data, responseJson))
            // if (responseJson.error == 0) {  
            // }
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
function shouldMyWishList(state, subreddit) {
    if (state.isFetching) {
        return false
    } else {
        return true
    }
}

function fetchMyWishListIfNeeded(data) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.


    return (dispatch, getState) => {
        if (shouldMyWishList(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(MyWishlist(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}
export { fetchMyWishListIfNeeded }
