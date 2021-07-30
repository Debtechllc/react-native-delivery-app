import fetch from 'cross-fetch'
import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    RECEIVE_ERROR_LOGIN,
    REQUEST_LOGOUT

} from './types';
import { WEBSERVICE_URL } from '../config/config'
import { LOGIN_REQUEST } from '../config/serveraction'
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from "react-native"

function requestForLogin(data) {
    return {
        type: REQUEST_LOGIN,
        payload: { data },
    }
}

function receiveLogin(data, jsonresp) {
    return {
        type: RECEIVE_LOGIN,
        payload: { data },
        user:  jsonresp 
    }
}
function receiveErrorLogin(data, jsonresp) {
    return {
        type: RECEIVE_ERROR_LOGIN,
        json:  jsonresp 
    }
}
function assign_storage_user(data) {
    return {
        type: REQUEST_ASSIGN_STORAGE_USER,
        payload: data ,
    }
}
function logout() {
    return {
        type: REQUEST_LOGOUT,
    }
}

function login(data) {

    return dispatch => {
        dispatch(requestForLogin(data))
        return fetch(WEBSERVICE_URL + LOGIN_REQUEST + "?email=" + data.email + "&password=" + data.password, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("JSON RESPONSE-")
                console.log(responseJson)
                if (responseJson.error == 0) {
                    dispatch(receiveLogin(data, responseJson.data))
                } else {
                    dispatch(receiveErrorLogin(data, responseJson.message))
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
function shouldLogin(state, subreddit) {
    if (state.isFetching) {
        return false
    } else {
        return true
    }
}

function fetchLoginIfNeeded(data) {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.

    // This is useful for avoiding a network request if
    // a cached value is already available.


    return (dispatch, getState) => {
        if (shouldLogin(getState(), data)) {
            // Dispatch a thunk from thunk!
            return dispatch(login(data))
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }
    }
}

export { fetchLoginIfNeeded, assign_storage_user, logout }
