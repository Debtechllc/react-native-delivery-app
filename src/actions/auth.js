import {
  AUTH_SUCCESS,
  AUTH_FAIL,
} from './types.js';
import { AsyncStorage } from "react-native"


function getUser(){
  //AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
    //   AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
        AsyncStorage.getItem('User', (err, result) => {
          console.log(result);
        });
    //   });
    // });
}

export {getUser}