import $ from 'jquery';
import {
  getMyCrushesPromise,
  deleteCrushPromise,
  crushOnPromise} from '../crushApi.js';
var Promise = require('promise');


export function showLoginForm()  {
  $('.pageBody').append(require("../../components/login-form.html").toString());
  console.log("login form Showed");
}

export function showMainPage()  {
  $('.pageBody').append(require("../../components/main-page.html").toString());
  console.log("Main page Showed");
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
        viewMyCrushes(data);
      });
  });
} 

export function deleteCrushEventHandler() {
  var deleteButtons = $('.crush-list').children('.delete-crush-button');
  button.click( ()=> {
    deleteCrushPromise(button.attr("data-fbCrushID"))
    // .then(() => {
    //   return ;
    // })
    // .then((data)=> {
    //   console.log(data , "data")
    //   var arr = data.slice(data.length - 1);
    //   viewMyCrushes(arr);
    //   console.log(arr , "arr")
    // });
  })

} 









var allCrushes;
export function getMyCrushes() {
  if (allCrushes == null) {
    getMyCrushesPromise().then((data)=>{
      allCrushes = data;
    })
  }
  return allCrushes;
}

export function addCrush() {

}

export function viewMyCrushes(data) {
  var crushesList = $('.crush-list');
  $('.crush-list').children().remove();
  $.each(data, function(key,value){
    $('.crush-list').append(`<li class='crush'>${key+1}-${value.crushDisplayName}</li><button class="delete-crush-button" data-fbCrushID="${value.fbCrushID}" class="delete-crush-button">Delete</button>`);
  });
}
