$(document).ready(function () {
  // form 전환
  // transport 숨기기
  $("#transport").hide();

  // form 전환 button event
  $('.form-btn a').on('click', function (e) {
    // 페이지 새로고침 없음
    e.preventDefault();

    // 기존 active class 제거
    $('.form-btn a').removeClass('active');
    // click한 button active
    $(this).addClass('active');

    // form 전환
    // 클릭한 button의 data-target 가져오기
    const target = $(this).data('target');
    
    // 유효성 검사를 통해 target이 존재하는지 확인
    if (target && $(target).length) {
      // 모두 숨기기
      $('#lodging, #transport').hide();
      // 선택한 것만 보이기
      $(target).show();
    }
  });

  // 지역 목록
  const regions = [
    '서울', '부산', '대구', '인천', '광주', '대전', '울산',
    '세종', '경기', '강원', '충북', '충남',
    '전북', '전남', '경북', '경남', '제주'
  ];

  // 출발지 select
  const $departureSelect = $('#departure');
  $departureSelect.append('<option value="" disabled selected hidden>출발지 선택</option>');
  regions.forEach(place => {
    $departureSelect.append(`<option value="${place}">${place}</option>`);
  });

  // 도착지 select
  const $arrivalSelect = $('#arrival');
  function updateArrivalOptions(exclude) {
    $arrivalSelect.empty().append('<option value="" disabled selected hidden>도착지 선택</option>');
    regions.forEach(place => {
      if (place !== exclude) {
        $arrivalSelect.append(`<option value="${place}">${place}</option>`);
      }
    });
  }

  // 초기 전체 도착지 출력
  updateArrivalOptions();

  // 출발지 선택 시 도착지 업데이트
  $departureSelect.on('change', function () {
    const selected = $(this).val();
    updateArrivalOptions(selected);
  });

  // 목적지 목록
  const $destinationSelect = $('#destination');
  $destinationSelect.append('<option value="" disabled selected hidden>목적지 선택</option>');
  regions.forEach(place => {
    $destinationSelect.append(`<option value="${place}">${place}</option>`);
  });

  // 성인: 1~16명
  const $adultSelect = $('#adult');
  for (let i = 1; i <= 16; i++) {
    $adultSelect.append(`<option value="${i}" ${i === 2 ? 'selected' : ''}>${i}명</option>`);
  }

  // 어린이: 0~8명
  const $childSelect = $('#child');
  for (let i = 0; i <= 8; i++) {
    $childSelect.append(`<option value="${i}">${i}명</option>`);
  }

  // input date의 달력이 label을 클릭해도 달력이 열리게
  $('label').on('click', function () {
    const $input = $(this).find('input[type="date"]');

    if ($input.length) {
      const inputEl = $input[0];
      if (inputEl.showPicker) {
        inputEl.showPicker();
      } else {
        inputEl.focus();
      }
    }
  });

  // 달력 날짜 min max 설정
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // 체크인 최소 날짜 설정 (오늘)
  $('#checkin').attr('min', todayStr);

  // 체크아웃 최소 날짜 설정 (오늘 + 1일)
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  $('#checkout').attr('min', tomorrowStr);

  // 체크인 날짜 변경 시 체크아웃 최소 날짜 조정
  $('#checkin').on('change', function() {
    const checkinVal = $(this).val();
    if (checkinVal) {
      const checkinDate = new Date(checkinVal);
      checkinDate.setDate(checkinDate.getDate() + 1); // +1일

      const minCheckoutStr = checkinDate.toISOString().split('T')[0];
      $('#checkout').attr('min', minCheckoutStr);

      // 체크아웃 값이 없거나 최소일보다 작으면 자동 조정
      const checkoutVal = $('#checkout').val();
      if (!checkoutVal || checkoutVal < minCheckoutStr) {
        $('#checkout').val(minCheckoutStr);
      }
    }
  });

  // 여행 날짜 제한
  $('#travelD').attr('min', todayStr);

  // 새로고침 시 input[type="date"] 값 초기화
  $('input[type="date"]').val('');

  // 검색버튼
  // 서버주소 선언
  const serverBaseUrl = 'http://127.0.0.1:8080';
  // 현재 보이는 form submit
  $('#title button[type="submit"]').on('click', function(e) {
    // 페이지 새로고침 없음
    e.preventDefault();
    
    // lodging form이 현재 화면에 보이는 경우
    // (.is(':visible') = 요소가 화면에 보이면 감지)
    if ($('#lodging').is(':visible')) {
      // lodging form action 동적 변경 후 submit
      $('#lodging').attr('action', `${serverBaseUrl}/search/lodging`).submit();
    } else if ($('#transport').is(':visible')) {
      // transport form action 동적 변경 후 submit
      $('#transport').attr('action', `${serverBaseUrl}/search/transport`).submit();
    }
  });
});
