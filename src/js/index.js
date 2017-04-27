var Promise = require('promise');
import $ from 'jquery';
import Cookies from 'js-cookie';
import {onLoginClick} from './userApi.js';
import {getToken} from './utils/token.js';
import {authUser, getUserData} from './userApi.js'
import {showHeader, showFooter} from './view/template.js';
import {
  crushURLEventHandler,
  viewMyCrushes,
  viewCrushesOnMe,
  showLoginForm,
  showMainPage,
  showLoginForm } from './view/pages.js'
import {
  getMyCrushesPromise,
  getCrushesOnMePromise} from './crushApi.js';


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
      *   viewCrushesOnMe(data);
      * });
      * getMyCrushesPromise().then((data)=> {
      *   viewMyCrushes(data);
      * });
      * but a database error occurs so that's just a temporarily workaround ;
      */ 
      getCrushesOnMePromise()
      .then((data) => {
        viewCrushesOnMe(data);
        getMyCrushesPromise()
        .then((data)=> {
          viewMyCrushes(data);
        })
      });
      crushURLEventHandler();
    },
    (error) => {
      showLoginForm();
      onLoginClick();
    }
  )
});



