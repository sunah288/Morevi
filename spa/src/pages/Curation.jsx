import ProductCard from '../components/ProductCard';
import "../assets/css/Curation.css";
import "../assets/js/Curation.js"
import eventmain from '../assets/img/svg/eventmain1.svg'
import airpod from '../assets/img/airpod.jpg';
import coupon from '../assets/img/svg/coupon.svg';
import coupon1 from '../assets/img/svg/coupon1.svg';
import Coffee from '../assets/img/coffee.png';
import { Link } from 'react-router-dom';

// 상품 리스트 틀
export default function Curation() {
  return (
    <div className="curation1 wrap">
      {/* <img src={eventmain} alt="이벤트 이미지" /> */}
      <h2>상품 목록</h2>
      <ul className="st-slick">
        {dummyProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ul>
      <div className="ebtn">
        <a href="/">돌아가기</a>
        <Link to="/gift">뽑기하기</Link>
      </div>
    </div>
  );
}

// 상품 리스트
const dummyProducts = [
  {
    id: 1,
    title: "10% 할인쿠폰",
    // description: '생성형 AI 시대에 읽어야 할 도서', (설명 구문)
    image: coupon,
  },
  {
    id: 2,
    title: "20% 할인쿠폰",
    image: coupon,
  },
  {
    id: 3,
    title: "30% 할인쿠폰",
    image: coupon,
  },
  {
    id: 4,
    title: "40% 할인쿠폰",
    image: coupon,
  },
  {
    id: 5,
    title: "커피 기프티콘",
    image: Coffee,
  },
  {
    id: 6,
    title: "치킨 기프티콘",
    image: coupon1,
  },
  {
    id: 7,
    title: "에어팟 프로",
    image: airpod,
  },
];