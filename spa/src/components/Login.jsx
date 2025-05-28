import React, { useEffect } from 'react';
import { handleLoginPopup } from '../assets/js/Login.js'; // login.js에서 export한 함수 임포트
import "../assets/css/Login.css";

const LoginPopup = () => {
  useEffect(() => {
    // 로그인 팝업 관련 JS 코드 실행
    handleLoginPopup();

    // Cleanup 함수: 컴포넌트가 언마운트 될 때 이벤트 핸들러를 제거합니다
    return () => {
      $(document).off("click", "#login-btn");
      $(document).off("click", ".login-close");
      $(document).off("mouseup");
      $(document).off("submit", "#login-form");
    };
  }, []); // 빈 배열을 사용하여 한 번만 실행되도록 설정

  return (
    <div id="login">
      <div className="wrap">
        <button className="login-close">X</button>
        <h2 className="h2">로그인</h2>
        <p className="p">설레는 순간, 여행은 MOREVI</p>
        <form id="login-form" method="post">
          <input type="text" name="username" placeholder="아이디 입력" className="input-box" />
          <input type="password" name="password" placeholder="비밀번호 입력" className="input-box" />
          <button type="submit" className="login-btn">로그인</button>
        </form>
        <ul className="login-links">
          <li><a href="">아이디 찾기</a><span>·</span></li>
          <li><a href="">비밀번호 찾기</a><span>·</span></li>
          <li><a href="../mpa/signup.html">회원가입</a></li>
        </ul>
        <ul className="login-sns">
          <li><a href="">Kakao</a></li>
          <li><a href="">Naver</a></li>
          <li><a href="">Apple</a></li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPopup;
