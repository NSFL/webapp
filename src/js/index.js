var Promise = require('promise');
import Cookies from 'js-cookie';
import {getToken} from './utils/token.js';
import {showMainPage, showLoginForm} from './view/pages.js'
import {onLoginClick} from './userApi.js';
import {showHeader, showFooter} from './view/template.js';
import {
  getMyCrushesPromise,
  showMyCrushes,
  getCrushesOnMePromise,
  showCrushesOnMe } from './crushApi.js';
import {authUser, getUserData} from './userApi.js'
import $ from 'jquery';

$(()=> {
  getToken();
  showHeader();
  showFooter();
  authUser().then( 
    (data) => {
      showMainPage();
      getUserData(data);
      /*
      * the next functions was originaly like : 
      *   
      * getCrushesOnMePromise().then((data) => {
      *   showCrushesOnMe(data);
      * });
      * getMyCrushesPromise().then((data)=> {
      *   showMyCrushes(data);
      * });
      * but a database error occurs so that's just a temporarily workaround ;
      */ 
      getCrushesOnMePromise()
      .then((data) => {
        showCrushesOnMe(data);
        getMyCrushesPromise().then((data)=> {
          showMyCrushes(data);
        })
      })
    },
    (error) => {
      showLoginForm();
      onLoginClick();
    }
  )
});



