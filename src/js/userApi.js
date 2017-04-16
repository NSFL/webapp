import $ from 'jquery';
import Cookies from 'js-cookie';

// Gets all user data
export function getUserData(data) {
  Cookies.set('appUserID', data.appUserID);
  $('.user-name').text(data.displayName);
  // $('.profile-picture').css({backgroundImage: 'url(' + data.pictureUrl + ')'});
}


// Session API that authorize the user
export function authUser() {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:4567/api/users/session',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', Cookies.get('Authorization'));
      },
      success: (data)=> {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
  
// Handles the redirects to login API on login click
export function onLoginClick() {
  $('.login-btn').click( function() {
    window.location.href = 'http://localhost:4567/api/login';
  });
};
  
