import $ from 'jquery';

export function showHeader()  {
  $('header').append(require("../../components/header.html").toString());
}

export function showFooter()  {
  $('footer').append(require("../../components/footer.html").toString());
}
