import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/Header.css";
import "../assets/css/Layout.css";
import LoginPopup from '../components/Login.jsx';  // LoginPopup 컴포넌트 임포트

export default function Header() {
  return (
    <header>
      <div className='wrap'>
        <a href="/">
          <h1 className='english h1'>MOREVI</h1>
        </a>
        <nav className='h5'>
          <ul className="main-menu">
            <li><Link to="#">숙소</Link></li>
            <li><Link to="#">교통</Link></li>
            <li><Link to="/curation" className='english'>EVENT</Link></li>
          </ul>
        </nav>
        <ul className="icons">
          <li><Link to="#">언어</Link></li>
          <li><a href="/mpa/reservation.html">예약내역</a></li>
          <li><Link to="#" id="login-btn">로그인</Link></li>
        </ul>
      </div>
      <LoginPopup /> {/* 로그인 팝업 컴포넌트를 렌더링 */}
    </header>
  );
}
