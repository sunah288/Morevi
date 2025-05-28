export const handleLoginPopup = () => {
    $('#login').hide();
  // 로그인 팝업 열기
  $(document).on("click", "#login-btn", function () {
    $("#login").fadeIn();
  });

  // 팝업 닫기
  $(document).on("click", ".login-close", function () {
    $("#login").fadeOut();
  });

  // 바깥 클릭 시 팝업 닫기
  $(document).mouseup(function (e) {
    const modal = $("#login .wrap");
    if (!modal.is(e.target) && modal.has(e.target).length === 0) {
      $("#login").fadeOut();
    }
  });

  // 로그인 처리
  $(document).on("submit", "#login-form", function (e) {
    e.preventDefault();

    const username = $("input[name='username']").val().trim();
    const password = $("input[name='password']").val().trim();

    if (!username || !password) {
      return alert("아이디와 비밀번호를 모두 입력해주세요.");
    }

    $.ajax({
      url: "http://localhost:8080/api/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username, password }),
      success: function (res) {
        alert("로그인 성공!");
        $("#login").fadeOut();
        window.location.href = "/"; // 로그인 후 이동 경로
      },
      error: function (err) {
        alert("로그인 실패: " + (err.responseJSON?.message || "서버 오류"));
      }
    });
  });

  // SNS 로그인 버튼 클릭 시 (임시 처리)
  $(document).on("click", ".login-sns a", function (e) {
    e.preventDefault();
    const provider = $(this).data("provider");
    alert(provider + " 로그인은 아직 준비 중입니다.");
    // 실제 로그인 URL로 이동하려면 아래 코드 사용:
    // window.location.href = "/auth/" + provider;
  });
};
