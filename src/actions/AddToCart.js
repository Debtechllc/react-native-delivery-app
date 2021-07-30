import fetch from 'cross-fetch'
import {
    REQUEST_ADDTO_CART,
    RECEIVE_ADDTO_CART,

} from './types';
import { WEBSERVICE_URL } from '../config/config'
import { ADD_TO_CART_REQUEST } from '../config/serveraction'
import { NavigationActions } from 'react-navigation';

function requestForAddToCart(data) {
    return {
        type: REQUEST_ADDTO_CART,
        payload: { data },
    }
}

function receiveAddToCart(data, jsonresp) {
    return {
        type: RECEIVE_ADDTO_CART,
        payload: { data },
        posts: { jsonresp }
    }
}


function addToCart(data) {
    console.log(data.email, data.password)
    console.log(WEBSERVICE_URL + ADD_TO_CART_REQUEST)
    return dispatch => {
        dispatch(requestForAddToCart(data))
        return fetch(WEBSERVICE_URL + ADD_TO_CART_REQUEST, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product_id:data.product_id, user_id:data.user_id}),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("Add to cart response..........")
            console.log(responseJson)
             console.log(responseJson.error)
            //  if (responseJson.encData.error == 0) {
            //      console.warn("Go to home")
                dispatch(receiveAddToCart(data, responseJson))
             //}
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
function shouldAddToCart(state, subreddit) {
    if (state.isFetching) {
        return false
    } else {
        return true
    }
}

function fetchAddToCartIfNeeded(data) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.


    return (dispatch, getState) => {
        if (shouldAddToCart(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(addToCart(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}
export { fetchAddToCartIfNeeded }
