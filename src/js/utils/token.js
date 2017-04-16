import Cookies from 'js-cookie';
import {getParameterByName} from '../utils/helper.js';

// Function to save the returned token from the queryparameter into the Cookies and then remove it from the URI
export function getToken() {
  if ( getParameterByName('token') != null ) {
    Cookies.set('Authorization', getParameterByName('token'));
    window.location.href = location.protocol + '//' + location.host + location.pathname;
  } 
}

