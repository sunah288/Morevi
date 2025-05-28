// 영어 자동 감싸기 함수 (텍스트가 있는 엘리먼트에 대해)
function wrapEnglishInElements() {
  const tags = 'p, span, div, li, h1, h2, h3, h4, h5, h6, td, th, a, strong, em, b, i';

  $(tags).each(function () {
    $(this).contents().filter(function () {
      return this.nodeType === 3 && !$(this).parent().is('span[lang="en"]');
    }).each(function () {
      const text = this.nodeValue;
      const replaced = text.replace(/([a-zA-Z]+)/g, '<span lang="en">$1</span>');
      if (replaced !== text) {
        $(this).replaceWith(replaced);
      }
    });
  });
}

$(document).ready(function () {
  // 헤더, 푸터, 로그인 로드 후 영어 감싸기 실행
  $("header").load("header.html", function () {
    wrapEnglishInElements();
  });
  $("footer").load("footer.html", function () {
    wrapEnglishInElements();
  });
  $("#login").load("login.html", function () {
    wrapEnglishInElements();
  });

  $("#signupForm").on("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: $("input[name='name']").val().trim(),
      username: $("input[name='username']").val().trim(),
      email: $("input[name='email']").val().trim(),
      password: $("input[name='password']").val(),
      confirmPassword: $("input[name='confirmPassword']").val()
    };

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않아요!");
      return;
    }

    $.ajax({
      url: "http://localhost:8080/api/register",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (res) {
        alert("회원가입 성공! 🎉");
        window.location.href = "/";
      },
      error: function (err) {
        alert("회원가입 실패: " + (err.responseJSON?.message || "서버 오류"));
      }
    });
  });
});
