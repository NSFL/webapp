var Promise = require('promise');
import Cookies from 'js-cookie';
import $ from 'jquery';


// START: Handling Users's crushes 
export function showMyCrushes(data) {
  $.each(data, function(key,value){
    $('.crush-list').append(`<li class='crush'>${key+1}-${value.crushDisplayName}</li>`);
  });
}

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
export function showCrushesOnMe(data) {
  $('.number').text(data);
}

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
