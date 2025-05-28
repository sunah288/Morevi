$(document).ready(function() {
  $(".st-slick").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 10000,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 1,
    arrows: false,
    dots: false,
    variableWidth: true,
    pauseOnHover: true,
  });
});