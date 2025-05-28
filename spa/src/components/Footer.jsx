import { Link } from 'react-router-dom';
import '../assets/css/Footer.css'
import '../assets/css/Layout.css'

export default function Footer() {
  return (
    <footer>
      <div className="mfo wrap">
        <h1 className='english h1'>MOREVI</h1>
        <ul>
          <li><a href="">이용약관</a></li>
          <li><a href="">개인정보처리방침</a></li>
          <li><a href="">여행자보험</a></li>
          <li><a href="">여행약관</a></li>
        </ul>
        <div className="text">
          <p>
            (주)MOREVI<span>ㅣ 대표이사</span> <span>ooo ㅣ</span><span>사업자등록번호 000-00-0000 |</span> <span>고객센터</span> 1234-5678ㅣ
          </p>
          <p>※ 부득이한 사정에 의해 확정된 여행일정이 변경되는 경우 여행자의 사전 동의를 받습니다.</p>
          <p>※ MOREVI (주)은 개별 항공권과 호텔 숙박권 판매에 대하여 통신판매중개자로서 통신판매의 당사자가 아니며 해당 상품의 거래 정보 및 거래 등에 대해 책임을 지지 않습니다.</p>
        </div>
        <div className="sns">
          <a href="">인스타</a><a href="">카카오톡</a><a href="">블로그</a>
        </div>
      </div>
    </footer>
  );
}
