var Promise = require('promise');
import Cookies from 'js-cookie';
import $ from 'jquery';


// START: Handling Users's crushes API
export function getMyCrushesPromise() {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: 'GET',
      url: `http://localhost:4567/api/users/${Cookies.get('appUserID')}/crushes`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', Cookies.get('Authorization'));
      },
      success: (data) => {
        resolve(data);
      },
      error: (error) => {reject(error)} 
    })
  }
)};
// END: Handling Users's crushes 


// START: Handling crushes on user

export function getCrushesOnMePromise(){
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: 'GET',
      url: `http://localhost:4567/api/users/${Cookies.get('appUserID')}/crushes-on-me-count`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', Cookies.get('Authorization'));
      },
      success: (data) => {
        resolve(data);
      },
      error: (error) => {reject(error)} 
    });
  })
}
// END: Handling crushes on user


// START: Handling adding crush


export function crushOnPromise(crushURL){
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: 'POST',
      url: `http://localhost:4567/api/users/${Cookies.get('appUserID')}/crushes`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', Cookies.get('Authorization'));
      },
      data: crushURL,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {reject(error)} 
    });
  })
}
// END: Handling adding crush


// START: Handling deleting crush

export function deleteCrushPromise(crushURL) {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: 'DELETE',
      url: `http://localhost:4567/api/users/${Cookies.get('appUserID')}/crushes/${crushURL}`,
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', Cookies.get('Authorization'));
      },
      success: (data) => {
        resolve(data);
      },
      error: (error) => {reject(error)} 
    });
  })
}
// END: Handling deleting crush
