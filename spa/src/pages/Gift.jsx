import React, { useState } from 'react';
import "../assets/css/Gift.css";
import "../assets/css/Layout.css";

export default function Gift() {
  const gifts = [
    { name: '10% 할인쿠폰', weight: 550 },   // 55%
    { name: '20% 할인쿠폰', weight: 240 },   // 24%
    { name: '30% 할인쿠폰', weight: 170 },   // 17%
    { name: '40% 할인쿠폰', weight: 24 },    // 2.4%
    { name: '커피 기프티콘', weight: 10 },   // 1%
    { name: '치킨 기프티콘', weight: 4 },    // 0.4%
    { name: '에어팟 프로', weight: 1 }       // 0.1%
  ];

  const [selected, setSelected] = useState(null);

  const recommend = () => {
    const totalWeight = gifts.reduce((sum, gift) => sum + gift.weight, 0);
    let random = Math.random() * totalWeight;

    for (const gift of gifts) {
      if (random < gift.weight) {
        setSelected(gift.name);
        return;
      }
      random -= gift.weight;
    }
  };

  return (
    <div className='curation1 wrap'>
      <h3>경품 추천</h3>
      <button className='gift-btn' onClick={recommend}>추천받기</button>
      {selected && <p>추천 경품: {selected}</p>}
    </div>
  );
}
