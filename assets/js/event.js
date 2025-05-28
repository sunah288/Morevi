$(document).ready(function(){ 
  $('#event .wrap ul').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1000
  });
});