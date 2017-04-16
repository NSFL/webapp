import $ from 'jquery';

export function showLoginForm()  {
  $('.pageBody').append(require("../../components/login-form.html").toString());
  console.log("login form Showed");
}

export function showMainPage()  {
  $('.pageBody').append(require("../../components/main-page.html").toString());
  console.log("Main page Showed");
}
