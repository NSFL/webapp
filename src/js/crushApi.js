var Promise = require('promise');
import Cookies from 'js-cookie';
import $ from 'jquery';

var cachedCrushes;

// START: Handling Users's crushes API
export function getMyCrushesPromise() {
  if (cachedCrushes == null) {
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
    })
    .then((data)=> {
      cachedCrushes = data;
      return data;
    });
  }
  return Promise.resolve(cachedCrushes)
    .then((crushes) => {
      return crushes;
    });
}
// END: Handling Users's crushes 


// START: Handling getting crushes on user
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
        addCrushToCache(data);
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
        deleteCrushfromCache(data);
        resolve(data);
      },
      error: (error) => {reject(error)} 
    });
  })
}
// END: Handling deleting crush


// Helping functions
function addCrushToCache(crush) {
  if (cachedCrushes == null) cachedCrushes = [];
  cachedCrushes.push(crush);
}

function deleteCrushfromCache(crush) {
  var index = getCrushIndex(crush);
  console.log(index);
  if (index > -1) {
    cachedCrushes.splice(index, 1);
  }
}
function getCrushIndex(crush) {
  for (var i = 0 ; i < cachedCrushes.length; i++) {
    if (cachedCrushes[i].fbCrushID == crush.fbCrushID ) {
      console.log(i);
      return i;
    }
  }
}