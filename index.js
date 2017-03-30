import $ from 'jquery';

// START: Function to get the query parameter values
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// END: Function to get the query parameter values

$().ready( function() {

	// START: session API that authorize the user
	$.ajax({
		type: 'GET',
		url: 'http://localhost:4567/api/users/session',
		beforeSend: function (xhr) {
	    xhr.setRequestHeader ('Authorization', window.localStorage.getItem('Authorization'));
		},
		success: function(data) {
			if (data != null) {
				$('.main-page').css({display: 'flex'})
				var displayName = data.displayName ;
				var pictureUrl = data.pictureUrl ;
				$('.user-name').text(displayName);
				$('.profile-picture').css({backgroundImage: 'url(' + pictureUrl + ')'});
			} else {
				alert('Sorry Not authorized user :( ');
			}
		},
		error: function() {
			$('.login-page').css({display: 'flex'})
		}
	});
	// END: session API that authorize the user

	// START: Function to save the returned token from the queryparameter into the localstorage and then remove it from the URI
	if ( getParameterByName('token') != null ) {
		window.localStorage.setItem('Authorization', getParameterByName('token') );
		$('.welcome').css({ display: 'flex' })
		window.location.href = location.protocol + '//' + location.host + location.pathname;
	} 
	// END: Function to save the returned token from the queryparameter into the localstorage and then remove it from the URI

	// START: Function the redirects to login API on login click
	$('.login-btn').click( function() {
		window.location.href = 'http://localhost:4567/api/users/login';
	});
	// END: Function the redirects to login API on login click

	// START: API that shows the people you have crushed on 
	$.ajax({
		type: 'GET',
		url: 'http://localhost:4567/api/users/crushes',
		beforeSend: function (xhr) {
	    xhr.setRequestHeader ('Authorization', window.localStorage.getItem('Authorization'));
		},
		success: function(data) {
			$.each(data, function(key,value){
				$('.crush-list').append(`<li class='crush'>${key+1}${value.crushID}</li>`);
			});
      $('.crush-list').append(`<input type='text' name='new crush' placeholder='Add new crush'>`);
		},
		error: function() {
		}
	});
	// END: API that shows the people you have crushed on 

});
