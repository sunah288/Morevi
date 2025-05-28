$(document).ready(function() {
  if (!$('.slider').hasClass('slick-initialized')) {
    $(".st-slick").slick({
      arrows: false,
      autoplay: false,
      draggable: false,
      infinite: true,
      speed: 500,
      dots: true,
      appendDots: $('.dots'),
      customPaging: function (slider, i) {
        const labels = ['여름 맞이 기획전', '나 홀로 떠나보자', '가족들과 함께 가요', '연인과 로맨틱하게']; // 원하는 텍스트 배열
        return '<button type="button">' + labels[i] + '</button>';
      }
    });
  }
});