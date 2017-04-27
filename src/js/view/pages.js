import $ from 'jquery';
import {
  getMyCrushesPromise,
  deleteCrushPromise,
  crushOnPromise} from '../crushApi.js';
var Promise = require('promise');

export function showLoginForm()  {
  $('.pageBody').append(require("../../components/login-form.html").toString());
}

export function showMainPage()  {
  $('.pageBody').append(require("../../components/main-page.html").toString());
}

export function viewCrushesOnMe(data) {
  $('.number').text(data);
}

export function crushURLEventHandler() {
  $('.submit-crush').click( ()=> {
    crushOnPromise($('.textfield').val())
    .then(() => {
      return getMyCrushesPromise();
    })
    .then((data)=> {
      $('.textfield').val('');
      viewMyCrushes(data);
      return data;
    })
  });
} 

export function viewMyCrushes(data) {
  var crushesList = $('.crush-list');
  $('.crush-list').children().remove();
  $.each(data, function(key,value){
    $('.crush-list').append(`
      <li class='crush'>
        ${key+1}-${value.crushDisplayName}
      </li>
      <button
        data-fbCrushID="${value.fbCrushID}"
        class="delete-crush-button">
        Delete
      </button>
    `)
    .children(`.delete-crush-button`).click( function() {
      deleteCrushPromise(this.getAttribute('data-fbcrushid'))
      .then(()=>{
        return getMyCrushesPromise();
      })
      .then((data)=>{
        viewMyCrushes(data);
        return data;
      })
    })
  });
}
