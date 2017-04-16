import $ from 'jquery';

export function showHeader()  {
  $('header').append(require("../../components/header.html").toString());
  console.log("Header Showed");
}

export function showFooter()  {
  $('footer').append(require("../../components/footer.html").toString());
  console.log("Footer Showed");
}
