const API_BASE = "http://localhost:8080";

let loadingInterval;

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

  // 로그인, 폼, 결과박스 숨김 처리
  $('#login').hide();
  $("#pinForm").hide();
  $("#resultBox").hide();

  // 탭 전환 이벤트
  $("section#reservation ul li button").eq(0).on("click", function () {
    $("#emailForm").show();
    $("#pinForm").hide();
    $(this).addClass("tab-active");
    $("section#reservation ul li button").eq(1).removeClass("tab-active");
    $("#resultBox").hide();
  });

  $("section#reservation ul li button").eq(1).on("click", function () {
    $("#emailForm").hide();
    $("#pinForm").show();
    $(this).addClass("tab-active");
    $("section#reservation ul li button").eq(0).removeClass("tab-active");
    $("#resultBox").hide();
  });

  // 이메일 조회 폼 제출
  $("#emailForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#emailInput").val().trim();
    if (!email) return alert("이메일을 입력해주세요.");

    showLoading();

    setTimeout(() => {
      $.get(`${API_BASE}/reservations/email/${email}`)
        .done((data) => {
          showResult(data);
          wrapEnglishInElements(); // 새로 추가된 결과에 영어 감싸기 적용
        })
        .fail(() => {
          showError("예약 정보를 찾을 수 없습니다.");
        });
    }, 1000);
  });

  // 예약번호 + PIN 조회 폼 제출
  $("#pinForm").on("submit", function (e) {
    e.preventDefault();
    const resNo = $("#reservationNum").val().trim();
    const pin = $("#pinInput").val().trim();
    if (!resNo || !pin) return alert("예약번호와 PIN을 모두 입력해주세요.");

    showLoading();

    setTimeout(() => {
      $.get(`${API_BASE}/reservations/id/${resNo}?pin=${pin}`)
        .done((data) => {
          showResult(data);
          wrapEnglishInElements(); // 새로 추가된 결과에 영어 감싸기 적용
        })
        .fail(() => {
          showError("예약 정보를 찾을 수 없습니다.");
        });
    }, 1000);
  });

  // 공통 조회 버튼 클릭 이벤트
  $("#searchBtn").on("click", function () {
    if ($("#emailForm").is(":visible")) {
      $("#emailForm").trigger("submit");
    } else if ($("#pinForm").is(":visible")) {
      $("#pinForm").trigger("submit");
    }
  });
});

// 로딩 애니메이션 시작
function showLoading() {
  let dotCount = 0;
  const baseText = "조회 중입니다";
  $("#resultInfo").text(baseText);
  $("#resultBox").show();

  if (loadingInterval) clearInterval(loadingInterval);

  loadingInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4; // 0~3 반복
    let dots = ".".repeat(dotCount);
    $("#resultInfo").text(baseText + dots);
  }, 500);
}

// 로딩 애니메이션 종료
function hideLoading() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
}

// 결과 표시
function showResult(data) {
  hideLoading();

  if (!data || (Array.isArray(data) && data.length === 0)) {
    showError("예약 정보를 찾을 수 없습니다.");
    return;
  }

  let html = '';
  if (Array.isArray(data)) {
    html = data.map((item) => `
      <div class="bord">
        <p class="p">예약자명: ${item.name}</p>
        <p class="p">이메일: ${item.email}</p>
        <p class="p">상품명: ${item.product_name}</p>
        <p class="p">출발일: ${item.date}</p>
        <p class="p">예약번호: ${item.resv_id}</p>
      </div>
    `).join('');
  } else {
    html = `
      <div class="bord">
        <p class="p">예약자명: ${data.name}</p>
        <p class="p">이메일: ${data.email}</p>
        <p class="p">상품명: ${data.product_name}</p>
        <p class="p">출발일: ${data.date}</p>
        <p class="p">예약번호: ${data.resv_id}</p>
      </div>
    `;
  }

  $("#resultInfo").html(html);
  $("#resultBox").show();
}

// 에러 메시지 표시
function showError(message) {
  hideLoading();
  $("#resultInfo").html(`<p class="p">${message}</p>`);
  $("#resultBox").show();
}
